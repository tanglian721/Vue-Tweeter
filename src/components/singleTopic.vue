<template>
    <div id="singleTopic" @click="toOneTweetPage">
       <span id="num">#{{num+1}}</span> <span id="content">{{Tweet.content}}</span>
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name: "single-topic",
        props:{
             Tweet:{
                type:Object,
                require:true
            },
               num:Number
        },
        methods: {
            toOneTweetPage(){
                this.$store.commit("tweetIdget", this.Tweet.tweetId)
                cookies.set("singleTweet", this.Tweet)
                this.$router.push("/tweet")
            },
        },
     
    }
</script>

<style lang="scss" scoped>
#singleTopic{
    margin-top: 2vh;
    max-height: 6vh;
    overflow: hidden;
}
#num{
    color: rgb(173, 173, 6);
    font-size: 1.5rem;
}
#content{
    margin-left: 2vw;
    font-size: 1.2rem;
}
</style>