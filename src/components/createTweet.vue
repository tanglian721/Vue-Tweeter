<template>
  <div id="create-tweet">
    <img id="delete" src="../assets/delete.png" alt="" @click="backHome">
    <div v-if="submit === 'on'" id="text-area">
       <img id="userImg" :src= Imgpath>
       <div id="new-tweet" contenteditable="true" @blur="onEdit" v-html="textContent" @keypress.@="getusers" @keypress.#="hashTag">
       </div>
       <div id="users" v-if="usersdisplay">
         <user-array v-for="user in users" :key="user.userId" :userArray="user" @selectuser="setUser"></user-array>
       </div>
       <div v-if="hashtagdisplay"  id="hashTag-area" >
           <input  @click="hashTagEnd" id="hashTag-text" v-model="hashText" @keydown.enter="hashTagEnd">
           <p class="hashTags" v-for="hashTag in hashTags" :key="hashTag.tag" @click="tag(hashTag.tag)">#{{ hashTag.tag }}</p>  
        </div>
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
                console.log(this.textContent)
            },
            hashTag(){
                this.hashtagdisplay = true;
                setTimeout(() => {
                    document.getElementById('hashTag-text').focus();
                }, 200);
            },
            hashTagEnd() {
                
                 this.textContent = this.textContent.slice(0, this.textContent.length-1) + "<a class='hash' href='#/topic/" + this.hashText.slice(1, this.hashText.length) + "'><u>" + this.hashText+ "</u></a> &nbsp"
                 this.hashtagdisplay = false;
            },
            tag(data) {
                
                this.textContent = this.textContent.slice(0, this.textContent.length-1) + "<a class='hash' href='#/topic/" + data + "'><u>#" + data + "</u></a> &nbsp"
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
            },
            hashTags(){
                 return this.$store.getters.hashtagTopic
            },
            Imgpath() { if(cookies.get(cookies.get("logininfo").username)!= undefined){
                return cookies.get(cookies.get("logininfo").username) 
            } else {
                return this.$store.state.portrait[0].path
            }
            },
        },
        mounted () {
            console.log(this.Imgpath);
            console.log(cookies.get(cookies.get("logininfo").username))
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
            border-radius: 50%;
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
        #hashTag-text{
            font-size: 1.2rem;
        }
        .hashTags {
            width: 80%;
            border-bottom: 1px solid black;
            margin-top: 1vh;
            color: chocolate;
        }
    }
}
@media only screen and (min-width:760px){
    #create-tweet{
        padding-bottom: 3vh;
    #text-area{
        #userImg{
            width: 5vw;
        }
        #new-tweet{
            width: 70%;
            font-size: 1.2rem;
        }
    }
    #submit{
        margin-top: 2vh;
       transform: scale(1.5);
    }
  
    #hashTag-area{
        margin-left: 20%;
        .hashTags {
            width: 80%;
            border-bottom: 1px solid black;
            margin-top: 1vh;
            color: chocolate;
        }
    }
   
} 
}
@media only screen and (min-width:1336px){
    #create-tweet{
        #delete{
         transform: scale(0.5);
         margin: 1vh;
    }
    }

}

</style>