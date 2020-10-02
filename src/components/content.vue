<template>
    <div id="content">
        <button @click="alltweetGet">get</button> 
        <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>
    </div>
</template>

<script>
    import SingleTweet from "./tweet.vue"
    import axios from "axios"
    // import cookies from "vue-cookies"
     
    export default {
        name:"page-content",
        components:{
            SingleTweet
        },
        data() {
            return {
                tweets: []
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
                axios.request({
                    url:"https://tweeterest.ml/api/tweets",
                    method:"get",
                    headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  }
                }).then((response)=> {
                    console.log(response.data)
                    this.tweets = response.data
                    this.$store.commit("getHomePageTweets", response.data)
                }).catch((error)=>{
                    console.log("1212")
                    console.log(error)
                })
            }
         
        },
        mounted () {
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