<template>
  <div class="follows" @click="toUserPage">
    <img :src= Imgpath  alt="" />
    <div class="info">
       <h3>{{ followArray.username }}</h3>
       <p>{{ followArray.email }}</p>
       <p>{{ followArray.bio }}</p>
    </div> 
        <div v-if="followbtnDisplay">
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
                followbtnDisplay:true,
            }
        },
        props:{
             followArray:{
                type:Object,
                require:true
            }
        },
        methods: {
            toUserPage() {
                console.log(this.followArray.userId);
                this.$router.push("/user/" + this.followArray.userId)

                location.reload();         
            },
            followBtbCheck(){
                console.log(this.userDisplayId);
                console.log(this.userinfo.userId);
                if(this.userDisplayId != this.userinfo.userId){
                this.followbtnDisplay = false;
                };
            },
            checkFollowed() {
                for(let i = 0; i < this.userFollow.length; i++){
                 if(this.userFollow[i].userId == this.followArray.userId){
                    this.unfollow = false;
                };
                };
                console.log(this.unfollow);
                console.log(this.followArray.userId) 
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
                        "followId": this.followArray.userId
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
                        "followId": this.followArray.userId
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
          userinfo() {
            return cookies.get("logininfo")
          },
          token() {
            return cookies.get("loginToken")
          },
          userDisplayId(){
            return cookies.get("userpageId")
          },
          userFollow() {
            return this.$store.state.following;
          },
          Imgpath() { if(cookies.get(this.followArray.username)!= undefined){
                return cookies.get(this.followArray.username) 
            } else {
                return this.$store.state.portrait[0].path
            }
           }
        },
        mounted () {
            this.followBtbCheck()
            this.checkFollowed();
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
    grid-template-columns: 1fr 6fr 1fr;
    img{
        height: 6vh;
        border-radius: 50%;
    };
    h3{
        font-size: 1rem;
    }
    .info{
        margin-left: 4vw;
      p{
        font-size: 0.8rem;
      }
    }
}
.follow{

         border: 1px solid;
         border-radius: 1rem;
         padding: 5px;
        }
#followingBtn{
    background-color:white ;
    color:black ;
}
</style>