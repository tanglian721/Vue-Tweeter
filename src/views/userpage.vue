<template>
  <div id="userpage">
    <div id="top">
      <div id="back" @click="backHome">
        <img src="../assets/back.png" alt="" />
      </div>
    </div>
    <img id="userImg" :src= Imgpath alt="" @click="getFollowers" />
    <div v-if="followBtnDispaly">
      <span class="follow" v-if="unfollow" @click="followUser">follow</span>
      <span class="follow" id="followingBtn" v-else @click="unfollowUser">
        following
      </span>
    </div>
    <div id="userInfo">
      <p>
        <span>{{ user }}</span>
        <span>{{ birthday }}</span>
      </p>
      <p>
        <span>{{ email }}</span>
      </p>
      <p id="bio">
        Bio: 
       <span >{{ bio }}</span>
      </p>  
      <span id="following">
 following : {{ followsNumber }}
      </span>
      <span id="follower">
 follower : {{ followersNumber }}
      </span>
    </div>
    <div id="button">
      <span class="display" id="tweetbtn" @click="tweetShow">Tweet</span>
      <span class="display" id="followingbtn" @click="followingShow">
        Following</span>
      <span class="display" id="followersbtn" @click="followersShow">
        Followers</span>
    </div>
    <div id="content-display">
            <!-- <transition  mode="out-in" enter-active-class="animate__animated animate__slideInLeft" 
            leave-active-class="animate__animated animate__slideOutRight"> -->
      <single-content 
        v-if="bottomDisplay == 'tweet'" 
        key="content"></single-content>
      <followers-area 
        v-else-if="bottomDisplay == 'followers'"  
        v-for="follower in followers" 
        :key="follower.userId" 
        :followerArray="follower"></followers-area>
      <following-area 
        v-else-if="bottomDisplay == 'following'"  
        v-for="follow in follows" 
        :key="follow.userId" 
        :followArray="follow" ></following-area>
            <!-- </transition> -->
    </div>
  <bottom-bar></bottom-bar>
</div>
</template>

<script>
import cookies from "vue-cookies"
import axios from "axios"
import SingleContent from "../components/singlePersongContent"
import BottomBar from "../components/bottombar.vue"
import FollowersArea from "../components/followers.vue"
import FollowingArea from "../components/following"


export default {
    name: "user-single",
    components:{
            SingleContent,
            BottomBar,
            FollowersArea,
            FollowingArea
        },
    data() {
            return {
                user: "name",
                email: "email",
                birthday: "birthday",
                bio: "bio",
                followBtnDispaly:"true",
                followsNumber: "",
                follows: [],
                followersNumber: "",
                followers: [],
                bottomDisplay: "tweet",
                unfollow: true,
                Imgpath:"",
            };
        },
    props: {
            followerArray: {
                type: Object,
                required: true
            },
            followArray: {
                type: Object,
                require: true
            }
        },
    methods: {
        backHome() {
          this.$router.push("/");
          location.reload();
        },
        checkFollowed() {
            for(let i = 0; i < this.userFollow.length; i++){
             if(this.userFollow[i].userId == this.userDisplayId){
                this.unfollow = false;
             };
            };
            console.log(this.unfollow);
        },
        followBtn() {
            if(this.userDisplayId == this.userinfo.userId) {
                this.followBtnDispaly = false;
            };
        },
        tweetShow() {
            this.bottomDisplay = "tweet";
            document.getElementById("tweetbtn").style.backgroundColor = "#B2F7EF";
            document.getElementById("followingbtn").style.backgroundColor = "white";
            document.getElementById("followersbtn").style.backgroundColor = "white";
        },
        followingShow() {
            this.bottomDisplay = "following";
            document.getElementById("tweetbtn").style.backgroundColor = "white";
            document.getElementById("followingbtn").style.backgroundColor = "#B2F7EF";
            document.getElementById("followersbtn").style.backgroundColor = "white";
        },
        followersShow() {
             this.bottomDisplay = "followers";
             document.getElementById("tweetbtn").style.backgroundColor = "white";
             document.getElementById("followingbtn").style.backgroundColor = "white";
             document.getElementById("followersbtn").style.backgroundColor = "#B2F7EF";
         },
        getUser() {
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
                 console.log(response.data);
                  this.user = response.data[0].username;
                  this.email = response.data[0].email;
                  this.birthday = response.data[0].birthdate;
                  this.bio = response.data[0].bio;
                  this.Imgpath = cookies.get(this.user);
             }).catch((error) => {
                 console.log(error);
             })
         },
        getFollows() {
             axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "get",
                    headers: {
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        userId:this.userDisplayId
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.follows = response.data,
                    this.followsNumber = response.data.length
                }).catch((error) => {
                    console.log(error)
                })
            },
        getFollowers() {
                axios.request({
                    url: "https://tweeterest.ml/api/followers",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        userId:this.userDisplayId
                    }
                }).then((response) => {
                    this.followers = response.data;
                    this.followersNumber = response.data.length;
                }).catch((error) => {
                    console.log(error);
                })
            },
        followUser() {
          axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "loginToken": cookies.get("loginToken"),
                        "followId":this.userDisplayId
                    }
                }).then((response) => {
                    console.log(response.data);
                    this.unfollow = false;
                    this.getFollowers();
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
                        "loginToken": cookies.get("loginToken"),
                        // password?
                    }
                }).then((response) => {
                    console.log(response.data);
                    this.unfollow = true;
                }).catch((error) => {
                    console.log(error);
                })
            },
    },
    computed: {
            userinfo() {
                return cookies.get("logininfo");
            },
            userDisplayId() {
                return cookies.get("userpageId");
            },
            userFollow() {
                return this.$store.state.following;
            }
    },
    mounted () {
            this.getFollowers();
            this.getUser();
            this.getFollows();         
            this.checkFollowed();
            this.followBtn();
     
    }
}
</script>

<style lang="scss" scoped>
// @import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);
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
            position: absolute;
            top: 13vh;
            left: 5vw;
            border-radius: 50%;
    }
      #userInfo{
            position: relative;
            margin-left: 10vw;
            margin-top: 8vh;
            margin-bottom: 2vh;
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
    #button{
        // background-color: yellowgreen;
        position: relative;
        border-bottom:1px solid black;
        text-align: center;
        .display{
            position: relative;
            display: inline-block;
            border: 1px solid black;
            width: 18vw;
            border-bottom:none;
            padding: 5px;
            margin-left: 1px;
            top: 1px;
            border-radius: 10px 10px 0 0;
            
        }
        #tweetbtn{
            background-color:#B2F7EF;
        }
    }
    #content-display{
        background-color:#B2F7EF;
        overflow: scroll;
        height:50vh;
        position: relative;
    }
     #bottom-bar{
        z-index: 24;
        width: 100%;
        position: sticky;
        background-color: white;
        height: 8vh;
        bottom: 0;
    }

.follow{

         border: 1px solid;
         border-radius: 1rem;
         padding: 5px;
         position: absolute;
         top: 22vh;
         right:5vw;
        }
#followingBtn{
    background-color:#B2F7EF ;
    color: white;
}
// .content-enter{
//     transform: translateX(-100%);
// }
// .content-leave-to{
//     transform: translateX(100%)
// }
// .content-enter-active, .content-leave-active{
//     transition: tansform 1s ease-in-out;
// }

</style>