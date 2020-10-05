<template>
    <div id="content">
        <!-- <button @click="alltweetGet">get</button>  -->
        <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
    </div>
</template>

<script>
    import SingleTweet from "./tweet"  
    export default {
        name:"page-content",
        components:{
            SingleTweet
        },
        data() {
            return {
                // tweets: []
            }
        },
        props:{
            tweet:{
               type:Object,
               requried: true
            }
        },
        methods: {
            alltweetGet() {
                this.$store.dispatch("alltweetGet")
            }
         
        },
        computed: {
            tweets() {
                return this.$store.getters.tweetAllByDate 
            }
        },
        mounted () {
            // this.alltweetGet()
        },
    }
</script>

<style lang="scss" scoped>
#content{
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