<template>
    <div id="info-page">
        <img id="userImg" :src= Imgpath alt="" @click="userPage">
        <div id="userInfo" >
            <p id="user">{{ user }}</p>
            <p id="email">{{ email }}</p>
            <p id="birthday">{{ birthday }}</p>
            <p id="follow">
               <span id="following">Following : {{ following }}</span><br class="tablet">
               <span id="follower"> Follower : {{ follower }}</span>
            </p>
            <p id="bio">{{ bio }}</p>
        </div>
        <div class="tablet">
        <!-- <bottom-bar ></bottom-bar> -->
        </div>
        <div id="userFunction" >
             <h3 id="profile" @click="profile">
                 <img src="../assets/user (2).png" alt="" >
                 <span class="tabletHide">Profile</span>
             </h3>
            <h3 class="tablet">
                 <img v-if="this.$router.history.current.path == '/'" src="../assets/home_A.png" alt="" @click="toall">
                <img v-else src="../assets/home.png" alt="" @click="home">
                 <span class="tabletHide">Home</span>
            </h3>
             <h3 id="list">
                  <img v-if="this.$router.history.current.path == '/userfollow'" src="../assets/userlist_A.png" alt="" >
                  <img v-else src="../assets/userlist.png" alt="" @click="userFollow">
                  <span class="tabletHide">Follow</span>
             </h3>
             <h3 @click="toCallPage" class="tablet" id="atBtn">
                 <img src="../assets/at.png" alt="">
                 <p v-if="this.newNumber > 0" id="number">{{ newNumber }}</p>
                 <span class="tabletHide">Mail</span>
             </h3>

             <h3 id="topic" @click="topic">
                 <img src="../assets/topic_A.png" alt="" >
                 <span class="tabletHide">Topic</span>
             </h3>
             <h3 id="back" class="tablet" >
                <img v-if="topicDisplay" src="../assets/backBlack.png" alt=""  @click="toall">
               <img v-else src="../assets/backBlack.png" alt=""  @click="back"> 
             </h3>
        </div>
         <img id="createBtn" class="tablet" src="../assets/createBtn.png" @click="createNew">
         <span id="logout" @click="logout">Logout</span>   

    </div>
</template>

<script>
import cookies from "vue-cookies"
// import BottomBar from "../components/bottombar.vue"
    export default {
        name:"info-page",
        components:{
            // BottomBar,
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
            createNew() {
                this.$store.commit("createShow")
            },
            loading() {
                this.user = this.userinfo.username;
                this.email = this.userinfo.email;
                this.birthday = this.userinfo.birthdate;
                this.bio = this.userinfo.bio;
            },
            profile() {
                this.$router.push("/profile");
                 this.$store.commit("infoHide");
            },
            logout() {
                cookies.remove("logininfo");
                cookies.remove("loginToken");
                this.$store.commit("clearAllTweet")
                this.$router.push("/signin");
            },
            userPage() {
                cookies.set("userpageId", this.userinfo.userId );
                this.$store.commit("infoHide");
                this.$router.push("/user/" + this.userinfo.userId);
            },
            topic() {
                this.$store.commit("topicShow");
                console.log(screen.width)   
                   if(screen.width < '768'){         
                 this.$store.commit("infoHide");
                }
            },
            home(){
                this.$store.commit("createHide");
                if ( screen.width > 760 ){
                    this.$store.commit("infoShow");
                }else {
                    this.$store.commit("infoHide");
                }
                this.$router.push("/")
            },
            userFollow() {
                this.$router.push("/userfollow")
            },
             toCallPage() {
                console.log("a")
                this.$router.push("/calledpage")
            },
              toall() {
                this.$store.commit("topicHide");               
            },
              back() {
                console.log("asa")
                  window.history.back();
            },

        },
        computed: {
            userinfo() {
                return cookies.get("logininfo");
            },
            Imgpath() { if(cookies.get(cookies.get("logininfo").username)!= undefined){
                return cookies.get(cookies.get("logininfo").username) 
            } else {
                return this.$store.state.portrait[0].path
            }
            },
            follower() {
                return this.$store.state.follower.length;
            },
            following() {
                return this.$store.state.following.length;
            },
             newNumber() {
                return this.$store.getters.noticeTweet.length
            },
             topicDisplay() {
                return this.$store.state.topicdisplay
            },
            
        },
        mounted () {
            this.loading();
        },
    }  
</script>

<style lang="scss" scoped>
#info-page{
    position: absolute;
    z-index: 99;
    width: 60vw;
    height: 60vh;
    display: grid;
    align-content: start;
    background-color:white;
    #userImg{
        position: relative;
        width:20vw;
        left: 10vw;
        top: 5vw;
        margin-bottom: 5vh;
    }
    #userInfo{
        width: 100%;
        padding: 1vh 0;
        p{
           padding: 0 5vw;
           margin: 1vh 0 ;
        }
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
    }
 
    #userFunction{
        width: 100%;
        padding: 1vh 0;
        h3{
            padding: 1vh 5vw;
            margin: 1vh 0 ;
            img{
                width: 8vw;
            };
        }
    }
     #logout{
            position: relative;
            background-color: #B2F7EF;
            border: none;
            width: 12vw;
            color: white;
            padding: 0.4rem;
            border-radius: 04rem;
            margin-left:40vw;
            top: 4vh;
            filter: drop-shadow(2px 2px 5px gray);
        }
    
}
#infor-background{
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);
    }
button{
    position: absolute;
    right: 10vw;
    bottom: 2vh;
}
#userImg{
        border-radius: 50%;
    }

@media only screen and (min-width:760px){

    #info-page{
       #userImg{
        position: relative;
        width:12vw;
        left: 4vw;
        top: 5vw;
    }
    #userInfo{
        box-sizing: border-box;
        width: 90%;
        margin-top: 0;
        overflow: hidden;
        max-height: 25vh;
        p{
           margin: 1vh 1vw;
           padding: 0;
        }
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
    }
        #userFunction{
          position: relative;
          width: 100%;
          padding: 1vh 0;
          h3{     
             padding: 1vh 7vw;
             margin: 1vh 0 ;
             img{
                width:6vw;
            };
             }
        }
        #logout{
            text-align: center;
            width: 10vw;
            margin-left:5vw;
            top: 4vh;
        }
     
    }
       #createBtn{
        position: fixed;
        top: 80vh;
        right: 10vw;
        height: clamp(40px, 15vw, 80px);
        filter: drop-shadow(2px 2px 5px gray);
    }
    #atBtn{
        position: relative;
      #number{
        position: absolute;
        color: red;
        top:0;
        right: 7vw;
        font-size: 1.7rem;
    }
    }
}
@media only screen and (min-width:1366px) {
     #info-page{
       #userImg{
        width:6vw;
        left: 4vw;
        top: 5vh;
    }
        #userFunction{
          h3{
            display: grid;
             grid-template-columns: 1fr 2fr;
             column-gap: 2vw;
             align-items: center;
             padding: 1vh 3vw;
             img{
                width:3vw;
            };
             }
            #back{
                margin-left: 3vw;
            }
        }
        #logout{
            top: 5vh;
            width: 5vw;
        }
    }
}

</style>