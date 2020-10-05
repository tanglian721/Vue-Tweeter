<template>
    <div id="userfollowcontent">
          <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
    </div>
</template>

<script>
import axios from "axios"
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
            }
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
                            this.getComments(tweet)
                    // }
                    // for(let i = 0; i < response.data.length; i++){
                    //     if( response.data[i].userId == this.user.userId ){
                    //        this.likeCheck = true
                    //     }
                    // }
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
            }
        },
        mounted () {
            this.getUserFollowTweets();
        },
    }
</script>

<style lang="scss" scoped>

</style>