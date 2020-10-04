<template>
    <div id="content" key="content">
        <!-- <div v-if="followBtn">
            <span class="follow" v-if="unfollow" @click="followUser">follow</span>
            <span class="follow" id="following" v-else @click="unfollowUser">following</span>
        </div> -->
        <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>

    </div>
</template>

<script>
    import cookies from "vue-cookies"
    import SingleTweet from "./tweet"  

    export default {
        name:"single-content",
        components:{
            SingleTweet

        },
        data() {
            return {
            }
        },
        props:{
            tweet:{
               type:Object,
               requried: true
            },
         
        },
        methods: {
         
            singleTweetsGet() {
                this.$store.dispatch("SingleTweetGet")
            },
            show(){
               console.log(this.userDisplayId)
               console.log(this.userinfo.userId)
            },
            
         
        },
        computed: {
            tweets() {
                return this.$store.state.oneUserTweet 
            },
            userDisplayId(){
                return cookies.get("userpageId")
            },
            token() {
                return cookies.get("loginToken")
            },
            userinfo() {
                return this.$store.state.userinfo
            },
      
        },
        mounted () {
            this. singleTweetsGet()
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
// .follow{

//          border: 1px solid;
//          border-radius: 1rem;
//          padding: 5px;
//          position: absolute;
//          top: 22vh;
//          right:5vw;
//         }
// #following{
//     background-color:#B2F7EF ;
//     color: white;
// }

</style>