<template>
    <div>
        <div id="tweet-content">
            <img src="../assets/user (2).png" alt="" id="userImg">
            <div id="text-area">
                <div id="name-date">
                    <h3 id="name" @click="toUserPage">{{ tweet.username }}</h3> 
                    <h6 id="date">{{ tweet.created_at }}</h6>
                </div>
                <p id="tweet-text" @click="toOneTweetPage">{{ tweet.content }}</p>
                <div id="comment-like">
                    <h5 id="comment">
                        <img src="../assets/speech.png" alt="" @click="commentDisplay = !commentDisplay">
                        <span id="comment-number">{{ commentsNumber }}</span>
                    </h5>
                    <h5 id="like">
                        <div v-if="likeCheck">
                             <img  src="../assets/heart-red.png" alt="" @click="like">
                             <span id="like-active">{{ likesNumber }}</span>
                        </div>
                        <div v-else>
                            <img  src="../assets/heart.png" alt="" @click="like">
                            <span id="like-active">{{ likesNumber }}</span>
                        </div>
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
                <div v-if="commentDisplay" id="comment-area">
                    <div id="comment-splitter"></div>
                     <tweet-comment  v-for="comment in comments" :key="comment.commentID" :comment=comment></tweet-comment>
                </div>
            </div>
        </div>
        <div id="splitter"></div>
    </div>
</template>

<script>
    import TweetComment from "./comment.vue"
    import EditTweet from "./editTweet.vue"
    import axios from "axios"
    import cookies from "vue-cookies"

    export default {
        name:"single-tweet",
        components:{
            TweetComment,
            EditTweet
        },
        data() {
            return {
                comments: [],
                editDisplay:false,
                deleteDisplay:false,
                commentDisplay:false,
                commentsNumber:"",
                likesNumber:"",
                likeCheck:false,
                deleteId:"",
                deleteStatus:"on",
                errorInfo:""
            }
        },
        props:{
            tweet:{
               type:Object,
               requried: true
            },
            editTweet:{
               type:Object,
               requried: true
            },
            comment:{
                type:Object,
                requried:true
            }
        },
        methods: {
            test(){
                console.log(this.tweetAllByDate)
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
                cookies.set("userpageId", this.tweet.userId )
                this.$router.push("/user")
            },
            toOneTweetPage(){
                this.$store.commit("tweetIdget", this.tweet.tweetId)
                cookies.set("singleTweet", this.tweet)
                console.log(this.tweet.tweetId)
                this.$router.push("/tweet")
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
                }).catch((error) => {
                    console.log(error)
                })
            },
            getLike() {
                console.log(this.tweet.tweetId)
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
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
                    this.likesNumber = response.data.length
                    for(let i = 0; i < response.data.length; i++){
                        console.log(response.data[0].userId)
                        if( response.data[i].userId == this.user.userId ){
                           this.likeCheck = true
                        }
                    }
                    console.log(this.likeCheck)
                }).catch((error) => {
                    // console.log("1212")
                    console.log(error)
                })
            },
            like() {
                console.log("like")
                console.log(this.tweet.tweetId)
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
                    this.getLike()
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
                return cookies.get("logininfo")
            },
            tweetAllByDate(){
                return this.$store.getters.tweetAllByDate
            },
            token() {
                return cookies.get("loginToken")
            }
        },
        mounted () {
            this.getComments();
            this.getLike()
        },
        
    }
</script>

<style lang="scss" scoped>
#tweet-content{
    margin-top: 2vh;
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
    // #splitter{
    //     margin-top: 2vh;
    //     height: 1px;
    //     width: 100%;
    //     background-color:rgba($color: #000000, $alpha: 0.2);
    // }

</style>