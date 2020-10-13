<template>
    <div id="edit-tweet">
        <img id="delete" src="../assets/delete.png" alt="" @click="backHome">
        <div v-if="submit === 'on'" id="text-area">
        <img id="userImg" src="../assets/user (2).png">
        <div id="edittweet" contenteditable="true" @blur="onEdit" v-html="textContent" @keypress.@="getusers" @keypress.#="hashTag"></div>
        </div>
         <div id="users" v-if="usersdisplay">
         <user-array v-for="user in users" :key="user.userId" :userArray="user" @selectuser="setUser"></user-array>
       </div>
        <div v-if="hashtagdisplay"  id="hashTag-area" >
           <input  @click="hashTagEnd" id="hashTag-text" v-model="hashText" @keydown.enter="hashTagEnd">
           <p class="hashTags" v-for="hashTag in hashTags" :key="hashTag.tag" @click="tag(hashTag.tag)">#{{ hashTag.tag }}</p>  
        </div>
        <div class="message" v-else-if="submit === true">
            <h2 >Tweet Editd Sucessful!</h2>
            <span @click="backHome" >Back</span>   
        </div>
        <div class="message" v-else-if="submit === false">
            <h2 > {{errorInfo}}   </h2>
            <span @click="reEdit" >Write Again</span>   
        </div>
        <button id="submit" @click="tweetEdit">tweet</button>
    </div>
</template>

<script>
import UserArray from "../components/@array"  

    import cookies from "vue-cookies"
    import axios from "axios"
    export default {
        name: "edit-tweet",
        components:{
            UserArray

        },
        data() {
            return {
                textContent:this.editTweet.content,
                submit:"on",
                users:[],
                errorInfo:"",
                usersdisplay:false,
                hashtagdisplay: false,
                hashText: "#",
            }
        },
        props:{
            editTweet:{
               type:Object,
               requried: true
            },
        },
        methods: {
            tweetEdit(){
                axios.request({
                    url:"https://tweeterest.ml/api/tweets",
                    method:"patch",
                    headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                  data:{
                    "loginToken": this.token,
                    "tweetId": this.editTweet.tweetId,
                    "content": this.textContent
                  }
                }).then((response)=>{
                    console.log(response)
                    this.submit = true;
                    location.reload();
                }).catch((errorMessage)=>{
                    this.submit = false,
                    console.log(errorMessage)
                    this.errorInfo = errorMessage
                })
            },
             onEdit(event) {
                this.textContent = event.target.innerHTML;
                console.log(this.textContent)
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
            reEdit(){
                this.submit = "on"
            },
            backHome(){
                this.$emit('display', false)
            },
        },
        computed: {
            token() {
                return cookies.get("loginToken")
            },
            hashTags(){
                 return this.$store.getters.hashtagTopic
            }
        }
    }
</script>

<style lang="scss" scoped>
#edit-tweet{
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
        #edittweet{
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
     #hashTag-area{
        margin-left: 20%;
        .hashTags {
            width: 80%;
            border-bottom: 1px solid black;
            margin-top: 1vh;
            color: chocolate;
        }
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
}
 

</style>