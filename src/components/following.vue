<template>
        <div class="follows" @click="toUserPage">
        <img src="../assets/user (3).png" alt=""><span> {{ followArray.username }} </span>
        <div v-if="followBtn">
            <span class="follow" v-if="unfollow" @click="followUser">follow</span>
            <span class="follow" id="followingBtn" v-else @click="unfollowUser">following</span>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
    export default {
        name: "following-area",
        data() {
            return {
                unfollow:true,
            }
        },
        props:{
             followArray:{
                type:Object,
                require:true
            }
        },
        methods: {
            toUserPage(){
                console.log(this.followerArray.id)
                
                
            },
        },
        followBtn(){
                return this.userDisplayId != this.userinfo.userId
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
                    data:{
                        "loginToken": this.token,
                        "followId":this.userDisplayId //what is followId
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.unfollow = false

                }).catch((error) => {
                    console.log(error)
                })
            },
            unfollowUser() {
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
            computed: {
                userinfo() {
                return cookies.get("logininfo")
            },
            token() {
                return cookies.get("loginToken")
            },
            userDisplayId(){
                return cookies.get("userpageId")
            }
            },
      
    }
</script>

<style lang="scss" scoped>
.follows{
    width: 90%;
    // background-color: #fff;
    margin-left: 5%;
    margin-top: 2vh;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 8fr;
    img{
        height: 6vh;
    };
    span{
        margin-left: 4vw;
        font-size: 1.2rem;
    }
}
</style>