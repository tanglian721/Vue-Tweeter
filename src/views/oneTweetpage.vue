<template>
    <div id="one-tweet-page">
    <transition name="info">
         <info-page v-if="info" ></info-page>
     </transition>
    <transition name="infoBg">
        <div v-if="info" id="infor-background" @click="infoDisplay"></div>
     </transition>
      <top-bar></top-bar>
      <div id="tweetArea">
          <img class="img" :src= Imgpath alt="" id="userImg">
          <div id="text-area">
                <div id="name-date">
                    <h3 id="name" @click="toUserPage">{{ tweet.username }}</h3> 
                    <h6 id="date">{{ tweet.created_at }}</h6>
                </div>
                <p id="tweet-text" >{{ tweet.content }}</p>
                <div id="comment-like">
                    <h5 id="comment">
                        <img src="../assets/speech.png" alt="" @click="getComments">
                        <span id="comment-number">{{ commentsNumber }}</span>
                    </h5>
                    <h5 id="like">
                        <img src="../assets/heart-red.png" alt="" v-if="likesNumber > 0" @click="getLike">
                        <img src="../assets/heart.png" alt="" v-else @click="like">
                        <span id="like-active">{{ likesNumber }}</span>
                    </h5>
                    <h5>
                       <img v-if="tweet.username == user.username" id="edit" src="../assets/edit.png" alt="" @click="edit">
                    </h5>
                    <h5>
                       <img v-if="tweet.username == user.username" id="delete" src="../assets/delete (1).png" @click="deleteShow">
                    </h5>
                </div>
                <div id="deleteDiv" v-if="deleteDisplay">
                    <div v-if="deleteStatus == 'on'" class="message">
                     <h2 >Are you sure to delete this tweet?</h2>
                     <span @click="backHome" id="back">Back</span> 
                     <span @click="deleteTweet" >DELETE</span>   
                    </div>
                    <div v-else-if="deleteStatus == true" class="message">
                     <h2 >Tweet deleted successful!</h2>
                     <span @click="backHome" id="back">Back</span> 
                    </div>
                    <div v-else-if="deleteStatus == false" class="message">
                     <h2 >{{ errorInfo }}</h2>
                     <span @click="backHome" id="back">Back</span> 
                     <span @click="deleteTweet" >DELETE AGAIN</span>   
                    </div>
                </div>
                <edit-tweet v-if="editDisplay" :editTweet="tweet" @display="editHide"></edit-tweet>
                <div id="comment-area">
                    <tweet-comment v-for="comment in comments" :key="comment.commentID" :comment=comment></tweet-comment>
                    <div id="write-comment">
                        <div class="submit" v-if="submit == 'on'">
                            <textarea name="" id="new-comment" cols="30" rows="10" v-model="commentContent" ></textarea>
                            <br>
                            <button id="create" @click="createComment">submit</button>
                        </div>
                        <div class="submit" v-else-if="submit == true">
                             <h2 >Comment Created Sucessful!</h2>
                        </div>
                        <div class="submit" v-else-if="submit == false">
                            <h2 >{{submit}} </h2>
                            <span @click="reCreate" >Write Again</span>   
                        </div>
                    </div>
                </div>
          </div>
      </div>
       <transition enter-active-class="animate__animated animate__bounceInDown" leave-active-class="animate__animated animate__bounceOutUp">
      <create-tweet v-if="createNew"></create-tweet>
      </transition>
      <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import TopBar from "../components/topbar.vue"
import BottomBar from "../components/bottombar.vue"
import TweetComment from "../components/comment.vue"
import EditTweet from "../components/editTweet.vue"
import InfoPage from "../components/infopage.vue"
import CreateTweet from "../components/createTweet.vue"
import axios from "axios"
import cookies from "vue-cookies"
    export default {
        name: "onetweet-page",
          components:{
            TopBar,
            BottomBar,
            TweetComment,
            EditTweet,
            InfoPage,
            CreateTweet
        },
        data() {
            return {
                tweet:"",
                comments: [],
                commentsNumber:"",
                likesNumber:"",
                editDisplay:false,
                deleteDisplay:false,
                deleteId:"",
                deleteStatus:"on",
                errorInfo:"",
                submit:"on",
                commentContent:"What is your comment",
                Imgpath:""
            }
        },
        props:{
            comment:{
                type:Object,
                requried:true
            }
        },
        methods: {
            getOneTweet(){
                this.tweet = cookies.get("singleTweet")
                this.Imgpath = cookies.get(this.tweet.username)
            },
            infoDisplay() {
                this.$store.commit("infoHide")
            },
            edit() {
                this.editDisplay = true
                console.log(this.editDisplay)
            },
            editHide(childData){
                this.editDisplay = childData
            },
            deleteShow(){
                this.deleteDisplay = true
                this.deleteId = this.tweet.tweetId
                console.log(this.deleteId)
            },
            backHome(){
                this.deleteDisplay = false
            },
            toUserPage(){
                console.log(this.tweet.userId)
                this.$store.commit("DispalyUserIDget", this.tweet.userId)
                this.$router.push("/user")
            },
            reCreate(){
                this.submit = "on"
            },
            createComment(){
                console.log(this.tweet.tweetId)
                console.log(this.token)
                console.log(this.commentContent)
                axios.request({
                    url:"https://tweeterest.ml/api/comments",
                    method:"post",
                    headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                    data:{
                    "loginToken": this.token,
                    "tweetId": this.tweet.tweetId,
                    "content": this.commentContent
                  }
                }).then((response)=>{
                    console.log(response)
                    this.submit = true
                    setTimeout(() => {
                        this.submit = "on"
                        this.getComments()
                    }, 2000);
                }).catch((errorMessage)=>{
                    this.submit = false,
                    console.log(errorMessage)
                    this.errorInfo = errorMessage
                })
            },
            deleteTweet() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "loginToken": this.token,
                        "tweetId":this.deleteId
                  }
                }).then((response) => {
                    console.log(response.data)
                    this.deleteStatus = true,
                    this.$store.dispatch("alltweetGet")
                }).catch((errorMessage) => {
                    console.log(errorMessage)
                     this.deleteStatus = false 
                    this.errorInfo = errorMessage
                })
            },
            getComments() {
                console.log(this.tweet.tweetId)
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        "tweetId":this.tweet.tweetId
                  }
                }).then((response) => {
                    console.log(response.data)
                    this.commentsNumber = response.data.length
                    this.comments = response.data
                    // console.log(this.comments)
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            },
            getLike() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        "tweetId":this.tweetId
                  }
                }).then((response) => {
                    console.log(response)
                    this.likesNumber = response.data.length
                    // this.comments = response.data
                    // console.log(this.comments)
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            },           
            like() {
                console.log("like")
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "loginToken": this.token,
                        "tweetId":this.tweet.tweetId
                  }
                }).then((response) => {
                    console.log(response.data)
                    this.getLike();
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            },
            unlike() {
                console.log("like")
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "loginToken": this.token,
                        "tweetId":this.tweet.tweetId
                  }
                }).then((response) => {
                    console.log(response.data)
                    this.getLike()
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            }
        },
        computed: {
            user() {
                return cookies.get("logininfo")
            },
            token() {
                return cookies.get("loginToken")
            },
            tweetId(){
                return this.$store.state.tweetId
            },
             info(){
                return this.$store.state.infoForm
            },
            createNew(){
                return this.$store.state.createArea
            }
        },
        mounted () {
            this.getOneTweet();
            this.getComments();
            this.getLike()
        },
         
    }
</script>

<style lang="scss" scoped>
    #one-tweet-page{
        min-height: 100vh;
        #info-page{
    position: relative;
    z-index: 99;
     width: 60vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    }
    #create-tweet{
        width: 80%;
        min-height: 30vh;
        border-radius: 30px;
        background-color: white;
        position: fixed;
        top: 30vh;
        left: 10%;
        filter: drop-shadow(2px 2px 5px gray);
    }
    .info-enter, .info-leave-to{
    transform: translateX(-100%);
    }
    .info-enter-active, .info-leave-active{
    transition: transform 0.5s linear
    }
    .infoBg-enter, .infoBg-leave-to{
    opacity: 0;
    }
    .infoBg-enter-active, .infoBg-leave-active{
    transition: opacity 0.5s linear
    }
    #infor-background{
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);
    }
    }
    #top-bar{
        z-index: 20;
        position: sticky;
        width: 100%;
        background-color: #B2F7EF;
        height: 8vh;
        top: 0vw;
    }
    #tweetArea{
        min-height: 84vh;
        margin-top: 2vh;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 5fr;
        justify-items: center;
        >img{
            width: 10vw;
        }
        #name-date{
        z-index: 6;
           h3{
               z-index: 6;
               border-bottom:1px solid rgba($color: #000000, $alpha: 0.2);
           }
           h6{
               z-index: 6;
               margin-left: 60%;
           }
    }
    #tweet-text{
        margin-top: 2vh;
        margin-right: 5vw;
    }
    #comment-like{
        display: flex;
        margin-top: 2vh;
        h5{
            display: inline-block;
            margin-right: 5vw;
            img{
                width: 4vw;
            }
        }
    }
    #edit-tweet{
        width: 80%;
        min-height: 30vh;
        border-radius: 30px;
        background-color: white;
        position: fixed;
        top: 30vh;
        left: 10%;
        filter: drop-shadow(2px 2px 5px gray);
    }
    #deleteDiv{
        width: 80%;
        border-radius: 30px;
        background-color: white;
        position: fixed;
        top: 30vh;
        left: 10%;
        filter: drop-shadow(2px 2px 5px gray);
    }
        .message{
        height: 18vh;
        display: grid;
        align-items: center;
        justify-items: center;
        width: 80%;
        margin-left:10%;
        
        h2{
            text-align: center;
        }
        span{
            height: 2vh;
            padding: 2vw;
            line-height: 2vh;
            background-color: #f2b5d4;
            border-radius: 04rem;
            font-size: 1rem;
            color: white; 
        }
        #back{
            background-color: #B2F7EF;
        }
   }
    }
    #write-comment{
        margin-top: 2vh;
        margin-left: 12vw;
        #new-comment{
            height: 10vh;
            width: 90%;
        }
        #create{
            font-size: 1rem;
            
        }
    }
    #bottom-bar{
        z-index: 24;
        width: 100%;
        position: sticky;
        background-color: white;
        height: 8vh;
        bottom: 0;
    }
    .img{
    border-radius: 50%;
}
</style>