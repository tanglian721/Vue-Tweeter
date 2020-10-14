<template>
    <div id="detail-topic">
           <img  v-if="loadingImg" id="load" src="../assets/loading.gif" alt="">
           <div>
               
           <h1>#{{ topic }}</h1>
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
        watch:{
            topic: function(){
                console.log(this.topic);
                this.hashTagTweet(this.topic);
                this.hashtag = this.topic;
                console.log(this.hashtag)
    
            }
        },
        computed: {
            tweets() {
                return this.$store.getters.tweetAllByDate 
            },
            
            topic(){
                return this.$store.state.topicTag;
            }
        },
        methods: {
            hashTagTweet(data) {
                this.hashTweets=[];
                for (let i = 0; i < this.tweets.length; i++) {
                if (this.tweets[i].content.includes(data) == true && this.hashTweets.includes(this.tweets[i]) == false) {
                    this.hashTweets.push(this.tweets[i])
                   }
                }
                console.log(this.hashTweets)
                  this.loadingImg = false;
                console.log(screen.width)
                  if(screen.width < "1366"){
                this.$store.commit("topicHide");
                  }
            }
        },
        mounted () {
            this.hashTagTweet(this.topic)
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
    padding-top: 5vhnpm;
    text-align: center;
    color: coral;
    text-transform: uppercase;
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
@media only screen and (min-width:768px) {
   .tweet{
        width: 90%;
        margin-left: 5%;
    }
  
        
}

@media only screen and (min-width:1366px) {
   .tweet{
        width: 80%;
        margin-left: 10%;
    }
    #load{
        margin-left: 30%;    
    }    
}
</style>