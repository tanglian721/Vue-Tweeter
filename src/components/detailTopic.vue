<template>
    <div id="detail-topic">
           <img  v-if="loadingImg" id="load" src="../assets/loading.gif" alt="">
           <div>   
           <h1>#{{ hashtag }}</h1>
           <single-tweet class="tweet" v-for="tweet in hashTweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
                </div>
    </div>
</template>

<script>
import SingleTweet from "./tweet" 

    export default {
        name: "detail-topic",
         components:{
            SingleTweet
        },
        data() {
            return {
                hashTweets: [],
                loadingImg: false

            }
        },

        computed: {
            tweets() {
                return this.$store.getters.tweetAllByDate 
            },
            hashtag() {
                return this.$router.history.current.params.pathMatch;
            },
        },
        methods: {
            hashTagTweets() {
                console.log(this.hashtag)
                for (let i = 0; i < this.tweets.length; i++) {
                    console.log(this.tweets[i])
                if (this.tweets[i].content.includes(this.hashtag) == true && this.hashTweets.includes(this.tweets[i]) == false) {
                    this.hashTweets.push(this.tweets[i])
                   }
                }
                console.log(this.hashTweets)
                  this.loadingImg = false;

            }
        },
        mounted () {
            this.hashTagTweets();
        },
    }
</script>

<style lang="scss" scoped>
#detail-topic{
    display: grid;
    justify-items: center;
    align-content: start;
    overflow: hidden;
}
h1{
    text-align: center;
    color: coral;
}
.tweet{
    box-sizing: border-box;
    width: 90%;
    // background-color: white;
    padding: 2vh;
}
#load{
    width: 100%;
}

</style>