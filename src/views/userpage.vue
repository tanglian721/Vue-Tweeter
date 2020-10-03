<template>
    <div>
      <div id="top">
        <div id="back" @click="backHome"><img src="../assets/back.png" alt=""></div>
        </div>
        <img id="userImg" src="../assets/user.png" alt="" @click="getFollowers">
        <div id="userInfo">
            <p>
                <span>{{  user  }}</span>
                <span>{{  birthday  }}</span>
            </p>
            <p>
                <span>{{  email  }}</span>
            </p>
            <p>
             Bio: 
                <span>{{  bio  }}</span>
            </p>  
                <span id="following">following : 2</span>
                <span id="follower"> follower :4</span>
        </div>
        <single-content></single-content>
    </div>
</template>

<script>
import cookies from "vue-cookies"
import axios from "axios"
import SingleContent from "../components/singlePersongContent"


    export default {
        name: "user-single",
        components:{
            SingleContent
        },
        data() {
            return {
                user: "name",
                email:"email",
                birthday: "birthday",
                bio: "bio",
            }
        },
        methods: {
             backHome(){
                this.$router.push("/")
                location.reload()
            },
            getUser(){
                console.log(this.userDisplayId)
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        userId:this.userDisplayId
                    }
                }).then((response) => {
                    console.log(this.userDisplayId)
                     this.user = response.data[2].username,
                     this.email = response.data[2].email,
                     this.birthday = response.data[2].birthdate,
                     this.bio = response.data[2].bio
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            },
            getFollows() {
                console.log(this.userDisplayId)
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "tweetId":this.userDisplayId
                    }
                }).then((response) => {
                    console.log(response.data)
                }).catch((error) => {
                    console.log(error)
                })
            },
            getFollowers() {
                console.log(this.userDisplayId)
                axios.request({
                    url: "https://tweeterest.ml/api/followers",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "tweetId":this.userDisplayId
                    }
                }).then((response) => {
                    console.log(response.data)
                }).catch((error) => {
                    console.log(error)
                })
            }


        },
        computed: {
            userinfo() {
                return this.$store.state.userinfo
            },
            token() {
                return cookies.get("loginToken")
            },
            userDisplayId(){
                return this.$store.state.DisplayUserID
            }
        },
        mounted () {
            console.log("1")
            this.getUser();
        }
    }
</script>

<style lang="scss" scoped>
    #top{
        width: 100%;
        height: 20vh;
        background-color:  #B2F7EF;
        #back{
            position: relative;
            top: 5vw;
            left: 5vw;
            width: 8vw;
            height: 8vw;
            background-color: rgba($color: #000000, $alpha: 0.5);
            border-radius: 50%;
            img{
                width: 4vw;
                margin: 2vw;
            }
        }
    }
      #userImg{
            width: 25vw;
            position: relative;
            top: -13vw;
            left: 5vw;
    }
      #userInfo{
            position: relative;
            top: -13vw;
            left: 10vw;
            p{
              font-size: 1.2rem;
              span{

              margin-right: 20vw;
              }
            }
        }
</style>