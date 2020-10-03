<template>
    <div id="content">
        <!-- <button @click="singleTweetsGet">get</button>  -->
        <div v-if="followBtn">
            <span class="follow" v-if="unfollow" @click="followUser">follow</span>
            <span class="follow" id="following" v-else @click="unfollowUser">following</span>
        </div>
        <single-tweet class="tweet" v-for="tweet in tweets" v-bind:key="tweet.tweetId" :tweet=tweet ></single-tweet>

    </div>
</template>

<script>
    import axios from "axios"
    import cookies from "vue-cookies"
    import SingleTweet from "./tweet"  

    export default {
        name:"single-content",
        components:{
            SingleTweet

        },
        data() {
            return {
                unfollow:true
            }
        },
        props:{
            tweet:{
               type:Object,
               requried: true
            }
        },
        methods: {
            singleTweetsGet() {
                this.$store.dispatch("SingleTweetGet")
            },
            show(){
               console.log(this.userDisplayId)
               console.log(this.userinfo.userId)
            },
            followUser() {
                console.log(this.userDisplayId)
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        "loginToken": this.token,
                        "tweetId":this.userDisplayId //what is followId
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.unfollow = false

                }).catch((error) => {
                    console.log(error)
                })
            },
            unfollowUser() {// password?
                console.log(this.userDisplayId)
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "loginToken": this.token,
                        // "tweetId":this.userDisplayId
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.unfollow = true

                }).catch((error) => {
                    console.log(error)
                })
            },
         
        },
        computed: {
            tweets() {
                return this.$store.getters.tweetAllByDate 
            },
            userDisplayId(){
                return this.$store.state.DisplayUserID
            },
            token() {
                return cookies.get("loginToken")
            },
            userinfo() {
                return this.$store.state.userinfo
            },
            followBtn(){
                return this.userDisplayId != this.userinfo.userId
            }
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
.follow{
         border: 1px solid black;
         border-radius: 1rem;
        padding: 3px;
        position: absolute;
         top: 20vh;
         right:5vw;
        }
#following{
    background-color:#B2F7EF ;
    color: white;
}

</style>