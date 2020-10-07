<template>
    <div id="userfollowcontent">
          <div v-if="iftopic">
        <single-tweet class="tweet" v-for="tweet in tweetsByComments" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
        </div>
        <div v-else>
        <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"

import SingleTweet from "./tweet" 

    export default {
        name: "user-followtweets",
          components:{
            SingleTweet
        },
        props:{
            tweet:{
               type:Object,
               requried: true
            },
             iftopic:{ 
                type:Boolean
            },   
        },
        methods: {
            getComments(tweet) {
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        "tweetId":tweet.tweetId
                  }
                }).then((response) => {
                  tweet.commentstAmount = response.data.length;
                  this.$store.commit("pushFollowTweet", tweet)
                }).catch((error) => {
                    console.log(error)
                })
            },
            getLike(tweet) {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        "tweetId":tweet.tweetId
                  }
                }).then((response) => {
                    tweet.likeAmount = response.data.length;
                       for(let i = 0; i < response.data.length; i++){
                       
                        if( response.data[i].username == this.userinfo.username ){
                           tweet.ifLike = true;
                        }
                    }
                   this.getComments(tweet)
                }).catch((error) => {
                    console.log(error)
                })
            },
            forEachTweet(tweetsArray) {
                console.log(tweetsArray);
                for(let i = 0; i < tweetsArray.length; i++){
                    this.getLike(tweetsArray[i]);
                }
            },
            SingleTweetGet(user) {
              axios.request({
                url: "https://tweeterest.ml/api/tweets",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                },
                params: {
                    "userId": user.userId
                }
              }).then((response) => {
                console.log(response);
                this.forEachTweet(response.data);
              }).catch((error) => {
                console.log(error)
              })
            },
            getUserFollowTweets(){
                this.$store.commit("clearFollowTweet")
                console.log(this.followingArray)
                for(let i = 0; i < this.followingArray.length; i++){
                    this.SingleTweetGet(this.followingArray[i])
                }
            }
        },
        computed:{
            followingArray(){
                return this.$store.state.following;
            },
            tweets() {
                return this.$store.getters.userFollowTweetByDate 
            },
            tweetsByComments() {
                return this.$store.getters.userFollowTweetAllByComments 
            },
            userinfo() {
                return cookies.get("logininfo");
            },
        },
        mounted () {
            this.getUserFollowTweets();
        },
    }
</script>

<style lang="scss" scoped>
#userfollowcontent{
    display: grid;
    justify-items: center;
    align-content: start;
    overflow: hidden;
}
.tweet{
    box-sizing: border-box;
    width: 90%;
    // background-color: white;
    padding: 2vh;
}
</style>