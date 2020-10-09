<template>
    <div id="info-page">
        <img id="userImg" :src= Imgpath alt="">
        <div id="userInfo" @click="userPage">
            <p id="user">{{ user }}</p>
            <p id="email">{{ email }}</p>
            <p id="birthday">{{ birthday }}</p>
            <p id="bio">{{ bio }}</p>
            <p id="follow">
               <span id="following">following : {{ following }}</span>
               <span id="follower"> follower : {{ follower }}</span>
            </p>
        </div>
        <div id="userFunction">
             <h3 id="profile">
                 <img src="../assets/user (1).png" alt="" @click="profile">
                 Profile
             </h3>
             <h3 id="list">
                 <img src="../assets/align-left.png" alt="">
                 List
             </h3>
             <h3 id="topic">
                 <img src="../assets/trending.png" alt="">
                 Topic
             </h3>
        </div>
         <span id="logout" @click="logout">Logout</span>

      
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name:"info-page",
        data() {
            return {
                user: "name",
                email:"email",
                birthday: "birthday",
                bio: "bio",
            }
        },
        methods: {
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
                this.$router.push("/user");
            }

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
            }
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

</style>