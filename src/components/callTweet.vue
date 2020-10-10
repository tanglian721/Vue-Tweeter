<template>
    <div id="called-tweets">
        <img  v-if="loadingImg" id="load" src="../assets/loading.gif" alt="">
        <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
    </div>
</template>

<script>
import SingleTweet from "./tweet" 

    export default {
        name: "called-tweets",
         components:{
            SingleTweet
        },
        data() {
            return {
                loadingImg: false
            }
        },
        computed: {
            tweets() {
                return this.$store.getters.noticeTweet
            }
        },
        methods: {
          
        },
        mounted () {
        },

    }
</script>

<style lang="scss" scoped>

</style>