<template>
  <div>
    <div v-if="loginStatus">
     <div  id="userpage">
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
    <div id="button" class="desktopHide" >
      <span class="display" id="tweetbtn" @click="tweetShow">Tweet</span>
      <span class="display desktopHide" id="followingbtn" @click="followingShow">
        Following</span>
      <span class="display desktopHide" id="followersbtn" @click="followersShow">
        Followers</span>
    </div>
    <div id="content-display">
            <!-- <transition  mode="out-in" enter-active-class="animate__animated animate__slideInLeft" 
            leave-active-class="animate__animated animate__slideOutRight"> -->
      <single-content 
        v-if="bottomDisplay == 'tweet'" key="content"></single-content>
      <followers-area class="desktopHide"
        v-else-if="bottomDisplay == 'followers'"  
        v-for="follower in followers" 
        :key="follower.userId" 
        :followerArray="follower"></followers-area>
      <following-area  class="desktopHide"
        v-else-if="bottomDisplay == 'following'"  
        v-for="follow in follows" 
        :key="follow.userId" 
        :followArray="follow" ></following-area>
            <!-- </transition> -->
    </div>
    <div class="desktopHide">

     <bottom-bar></bottom-bar>
    </div>
     </div>
     <div class="desktop" id="destktop-follow">
         <div class="followRgiht">
         <div id="follow-nav">Following</div>
         <following-area 
           v-for="follow in follows" 
        :key="follow.userId" 
        :followArray="follow" ></following-area>
         </div>
         <div class="followRgiht">
         <div id="follow-nav">Followers</div>
        <followers-area   
        v-for="follower in followers" 
        :key="follower.userId" 
        :followerArray="follower"></followers-area>
         </div>
     </div>
  </div>
  <div v-else>
           <router-link to="/signin"></router-link>
       </div>
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
                loginStatus: false,  
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
           loginCheck() {
                if(cookies.get("loginToken") != undefined){
                   this.loginStatus = true;
                } else{
                this.$router.push("/signin")
                }
            },
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
            // userDisplayId() {
            //     return cookies.get("userpageId");
            // },
            userDisplayId() {
                return this.$router.history.current.params.pathMatch;
            },
            userFollow() {
                return this.$store.state.following;
            },Imgpath() { if(cookies.get(this.user)!= undefined){
                return cookies.get(this.user) 
             } else {
                return this.$store.state.portrait[0].path
             }
           },
    },
    mounted () {
          this.loginCheck();
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
#userpage{
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow: scroll;
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
@media only screen and (min-width:760px){

    #top{
        width: 100%;
        height: 15vh;
        background-color:  #B2F7EF;
        #back{
            transform: scale(0.5);
            position: relative;
            top: 3vw;
            left: 3vw;
        }
    }
      #userImg{
            width: 20vw;
            top: 10vw;
            left: 10vw;
    }
      #userInfo{
            margin-left: 40vw;
            margin-top: 2vh;
            margin-bottom: 2vh;
            p{
              font-size: 1.2rem;
              span{
              margin-right: 10vw;
              }
             }
             #bio{
                  width: 40vw;
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
        height:62vh;
    }


.follow{

       transform: scale(1.2);
         top: 20vh;
         right:4vw;
        }
#followingBtn{
    background-color:#B2F7EF ;
    color: white;
}
}
@media only screen and (min-width:1366px) {
#userpage{
    position: fixed;
    height: 100vh;
    width: 60%;
    overflow: scroll;
}
#top{
    width: 100%;
    height: 15vh;
    background-color:  #B2F7EF;
    #back{
        transform: scale(0.4);
        position: relative;
        top: 1vw;
        left: 1vw;
    }
    }
      #userImg{
        width: 12vw;
        top: 6vw;
        left: 10vw;
    }
      #userInfo{
        margin-left: 30vw;
        margin-top: 2vh;
        margin-bottom: 2vh;
         p{
              font-size: 1.2rem;
              span{
              margin-right: 8vw;
              }
             }
             #bio{
                  width: 40vw;
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
        height:73vh;
    }
.follow{

       transform: scale(1.2);
         top: 20vh;
         right:4vw;
        }
    #destktop-follow{
        position: absolute;
        height: 100vh;
        width: 40%;
        right: 0;
        display: grid;
        background-color: #7bdff2;
        grid-template-rows: 1fr 1fr;
    }
}
#follow-nav{
    height: 5vh;
    width: 100%;
    background-color: #0F7E95;
    text-align: center;
    font-size: 1.5rem;
    color: white;
    line-height: 5vh;
}
</style>