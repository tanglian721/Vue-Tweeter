<template>
    <div id="one-tweet-page">
      <top-bar></top-bar>
      <div id="tweetArea">
          <img src="../assets/user (2).png" alt="" id="userImg">
          <div id="text-area">
                <div id="name-date">
                    <h3 id="name" @click="toUserPage">{{ tweet.username }}</h3> 
                    <h6 id="date">{{ tweet.created_at }}</h6>
                </div>
                <p id="tweet-text" >{{ tweet.content }}</p>
                <div id="comment-like">
                    <h5 id="comment">
                        <img src="../assets/speech.png" alt="" @click="getComments">
                        <span id="comment-number">3</span>
                    </h5>
                    <h5 id="like">
                        <img src="../assets/heart.png" alt="" @click="getLike">
                        <span id="like-active">4</span>
                    </h5>
                    <h5>
                       <img v-if="tweet.username == user.username" id="edit" src="../assets/edit.png" alt="" @click="edit">
                    </h5>
                    <h5>
                       <img v-if="tweet.username == user.username" id="delete" src="../assets/delete (1).png" @click="deleteShow">
                    </h5>
                </div>
                <!-- <div id="deleteDiv" v-if="deleteDisplay">
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
                <edit-tweet v-if="editDisplay" :editTweet="tweet" @display="editHide"></edit-tweet> -->
                <div id="comment-area"></div>
          </div>
      </div>
      <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import TopBar from "../components/topbar.vue"
import BottomBar from "../components/bottombar.vue"
    import axios from "axios"
    import cookies from "vue-cookies"
    export default {
        name: "onetweet-page",
          components:{
            TopBar,
            BottomBar,
        },
        data() {
            return {
                tweet:"",
                comments: [],
                editDisplay:false,
                deleteDisplay:false,
                deleteId:"",
                deleteStatus:"on",
                errorInfo:""
            }
        },
        props:{
            comment:{
                type:Object,
                requried:true
            }
        },
        methods: {
            test(){
                console.log(this.tweetAllByDate)
            },
            getOneTweet(){
                
                console.log(this.tweetId)
                
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "tweetId":this.tweetId
                  }
                }).then((response) => {
                    console.log(response.data)
                    this.tweet = response.data
                    // this.comments = response.data
                    // console.log(this.comments)
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            },
            edit() {
                this.editDisplay = true
            },
            editHide(childData){
                this.editDisplay = childData
                console.log(this.editArea)
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
                    data:{
                        "tweetId":this.tweet.tweetId
                  }
                }).then((response) => {
                    console.log(response.data)
                    // this.comments = response.data
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
                    data:{
                        "tweetId":this.tweetId
                  }
                }).then((response) => {
                    console.log(response.data)
                    // this.comments = response.data
                    // console.log(this.comments)
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            }
        },
        computed: {
            user() {
                return this.$store.state.userinfo
            },
            tweetAllByDate(){
                return this.$store.getters.tweetAllByDate
            },
            token() {
                return cookies.get("loginToken")
            },
            tweetId(){
                return this.$store.state.tweetId
            }
        },
        mounted () {
            this.getOneTweet();
        },
         
    }
</script>

<style lang="scss" scoped>
    #one-tweet-page{
        min-height: 100vh;
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
    
    #bottom-bar{
        z-index: 24;
        width: 100%;
        position: sticky;
        background-color: white;
        height: 8vh;
        bottom: 0;
    }
</style>