<template>
  <div id="create-tweet">
  <img id="delete" src="../assets/delete.png" alt="" @click="backHome">
    <div v-if="submit === 'on'" id="text-area">
      <img id="userImg" src="../assets/user (2).png">
      <div id="new-tweet" contenteditable="true" @blur="onEdit" v-html="textContent" @keypress.@="getusers" @keypress.#="hashTag"></div>
      <div id="users" v-if="usersdisplay" @click="hashTagEnd">
         <user-array v-for="user in users" :key="user.userId" :userArray="user" @selectuser="setUser"></user-array>
      </div>
      <input v-if="hashtagdisplay" id="hashTag-area"  @click="hashTagEnd" v-model="hashText" @keydown.enter="hashTagEnd">    
    </div>
    <div class="message" v-else-if="submit === true">
      <h2 >Tweet Created Sucessful!</h2>
      <span @click="backHome" >Back</span>   
    </div>
    <div class="message" v-else-if="submit === false">
      <h2 >Error Message: {{submit}}   </h2>
      <span @click="reCreate" >Write Again</span>   
    </div>
    <button id="submit" @click="createTweet">tweet</button>
  </div>
</template>

<script>
import UserArray from "../components/@array"  
import cookies from "vue-cookies"
import axios from "axios"
export default {
        name: "create-tweet",
        components:{
            UserArray
        },
        data() {
            return {
                textContent:"What's happening?",
                submit:"on",
                errorInfo:"",
                users:[],
                usersdisplay:false,
                hashtagdisplay: false,
                contentBefore:'sdas',
                hashText: "#",
            }
        },
        props:{
             userArray:{
                type:Object,
                require:true
            }
        },
        methods: {
            open(data) {
                console.log("dsa");
                console.log(data);
                cookies.set("userpageId", data)
                this.$router.push("/user")
            },
            test() {
               console.log(this.token)
               console.log(this.textContent)
            },
            onEdit(event) {
                this.textContent = event.target.innerHTML;
                console.log(this.textContent)
            },
            createTweet(){
                axios.request({
                    url:"https://tweeterest.ml/api/tweets",
                    method:"post",
                    headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                  data:{
                    "loginToken": this.token,
                    "content": this.textContent
                  }
                }).then((response)=>{
                    console.log(response);
                    this.submit = true;
                    location.reload();
                }).catch((errorMessage)=>{
                    this.submit = false;
                    console.log(errorMessage);
                    this.errorInfo = errorMessage;
                })
            },
            getusers() {
                console.log('list')
                this.usersdisplay = true;
                axios.request({
                 url: "https://tweeterest.ml/api/users",
                 method: "get",
                 headers: {
                     "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                 },
             }).then((response) => {
                 console.log(response.data);
                 this.users = response.data;
             }).catch((error) => {
                 console.log(error);
             })
            },
            setUser(data) {
                console.log(data);
                this.textContent = this.textContent.slice(0, this.textContent.length-1) + "<a class='calluser' href='#/user/" + data.userId+ "'><u>@" + data.username + "</u></a> &nbsp";
                this.usersdisplay = false;
            },
            hashTag(){
                this.hashtagdisplay = true;
                setTimeout(() => {
                    document.getElementById('hashTag-area').focus();
                }, 500);
            },
            hashTagEnd() {
                 this.textContent = this.textContent.slice(0, this.textContent.length-1) + "<span class='hash'><u>" + this.hashText + "</u></span> &nbsp"
                 this.hashtagdisplay = false;
            },
            reCreate(){
                this.submit = "on"
            },
            backHome(){
                this.$store.commit("createHide")
            },
        },
        computed: {
            token() {
                return cookies.get("loginToken")
            }
        },
        mounted () {
        }
    }
</script>

<style lang="scss" scoped>
#create-tweet{
    box-sizing: border-box;
    #delete{
        width: 5vw;
        position: relative;
        margin: 2vh 5vw 1vh 5vw;
    }
    #text-area{
        position: relative;
        min-height: 18vh;
        #userImg{
            width: 10vw;
            margin-left: 5%;
            position: absolute;
            top: 0;
        }
        #new-tweet{
            // display: block;
            border: 1px solid black;
            height: 15vh;
            // background-color: blue;
            box-sizing: border-box;
            width: 70%;
            margin-left: 20%;
        }
    }
    #submit{
        background-color: #B2F7EF;
        border: none;
        color: white;
        padding: 0.4rem;
        border-radius: 04rem;
        margin-left:70%;
        margin-top: 1vh;
    }
    #users{
        width: 100%;
        height:30vh;
        overflow: scroll;
    }
    .message{
        display: grid;
        align-items: center;
        justify-items: center;
        width: 80%;
        min-height: 18vh;
        margin-left: 10%;
        span{
            width: 20vw;
            height: 2vh;
            padding: 2vw;
            line-height: 2vh;
            background-color: #f2b5d4;
            border-radius: 04rem;
            font-size: 1rem;
            color: white; 
        }
    }
    #hashTag-area{
        margin-left: 20%;
    }
}
 

</style>