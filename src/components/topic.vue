<template>
    <div id="topic">
     <h1># TOP 10 topic!</h1>
     <single-topic v-for="(tweet,index) in tweets" :key="tweet.tweetId" :Tweet="tweet" :num="index"></single-topic>  
    </div>
</template>

<script>
import SingleTopic from "../components/singleTopic.vue"
    export default {
        name: "topic-tweet",
        components: {
            SingleTopic
        },
        data() {
            return {
                tweets: this.$store.getters.tweetAllByComments.slice(0,10),
           
            }
        },
        props:{
            Tweet:{
                type:Object,
                require:true
            },
            num:Number
            
        },
        computed: {
            // topics() {
            //     return this.$store.getters.tweetAllByComments
            // }
            
        },
        mounted () {
            console.log(this.tweets)
        },
    }
</script>

<style lang="scss" scoped>
#topic{
    min-height: 84vh;
}

</style>