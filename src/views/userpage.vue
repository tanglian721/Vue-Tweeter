<template>
    <div id="userpage">
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
            <p id="bio">
             Bio: 
                <span >{{  bio  }}</span>
            </p>  
                <span id="following">following : 2</span>
                <span id="follower"> follower :4</span>
        </div>
        <single-content></single-content>
        <bottom-bar></bottom-bar>

    </div>
</template>

<script>
import cookies from "vue-cookies"
import axios from "axios"
import SingleContent from "../components/singlePersongContent"
import BottomBar from "../components/bottombar.vue"


    export default {
        name: "user-single",
        components:{
            SingleContent,
            BottomBar,

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
                    params:{
                        userId:this.userDisplayId
                    }
                }).then((response) => {
                    console.log(response.data)
                     this.user = response.data[0].username,
                     this.email = response.data[0].email,
                     this.birthday = response.data[0].birthdate,
                     this.bio = response.data[0].bio
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
#userPage{
    position: relative;
    width: 100%;
    overflow: hidden;
}
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
            >img{
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
            margin-left: 10vw;
            p{
              font-size: 1rem;
              span{

              margin-right: 20vw;
              }
              
            }
            #bio{
                  width: 80vw;
              }
        }
     #bottom-bar{
        z-index: 24;
        width: 100%;
        position: sticky;
        background-color: white;
        height: 8vh;
        bottom: 0;
    }

</style>