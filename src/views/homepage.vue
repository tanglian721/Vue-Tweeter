<template>
    <div id="homepage">
       <div v-if="loginStatus" id="display">
            <transition name="info">
               <info-page v-if="info" ></info-page>
            </transition>
            <transition name="infoBg">
                <div v-if="info" id="infor-background" @click="infoDisplay"></div>
            </transition>
            <top-bar></top-bar>
            <transition enter-active-class="animate__animated animate__bounceInDown" leave-active-class="animate__animated animate__bounceOutUp">
                <create-tweet v-if="createNew"></create-tweet>
            </transition>
            <page-content></page-content>
            <bottom-bar></bottom-bar>
       </div>
       <div v-else>
           <router-link to="/signin"></router-link>
       </div>
    </div>
</template>

<script>
import cookies from "vue-cookies"
import TopBar from "../components/topbar.vue"
import BottomBar from "../components/bottombar.vue"
import PageContent from "../components/content.vue"
import InfoPage from "../components/infopage.vue"
import CreateTweet from "../components/createTweet.vue"
import axios from "axios"
    export default {
        name:"landing-page",
        components:{
            TopBar,
            BottomBar,
            PageContent,
            InfoPage,
            CreateTweet
        },
        data() {
            return {
                loginStatus: false
            }
        },
        computed: {
            info(){
                return this.$store.state.infoForm
            },
            createNew(){
                return this.$store.state.createArea
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
            infoDisplay() {
                this.$store.commit("infoHide")
            },
            getFollows() {
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "get",
                    headers: {
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    params:{
                        userId:cookies.get("logininfo").userId
                    }
                }).then((response) => {
                    this.$store.commit("userFollowing", response.data);
                }).catch((error) => {
                    console.log(error);
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
                    this.$store.commit("userFollower", response.data);
                }).catch((error) => {
                    console.log(error);
                })
            },
            defaultSet() {
                this.$store.commit("infoHide");
                this.$store.commit("createHide");
            }
        },
        mounted () {
            this.loginCheck();
            this.getFollows();
            this.defaultSet();
        },
    }
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);
#homepage{
    z-index: 1;
    width:100vw;
    min-height: 100vh;
    background-color:#EFF7F6;
    position: relative;
    #display{
        z-index: 2;
        position: relative;
    }
    #top-bar{
        z-index: 20;
        position: sticky;
        width: 100%;
        background-color: #B2F7EF;
        height: 8vh;
        top: 0vw;
    }
    #content{
        z-index: 5;
        // background-color: wheat;
        min-height: 120vh;;
    }
    #bottom-bar{
        z-index: 24;
        width: 100%;
        position: sticky;
        background-color: white;
        height: 8vh;
        bottom: 0;
    }
    #info-page{
    position: relative;
    z-index: 99;
     width: 60vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    }
    #create-tweet{
        width: 80%;
        min-height: 30vh;
        border-radius: 30px;
        background-color: white;
        position: fixed;
        top: 30vh;
        left: 10%;
        filter: drop-shadow(2px 2px 5px gray);
    }
    .info-enter, .info-leave-to{
    transform: translateX(-100%);
    }
    .info-enter-active, .info-leave-active{
    transition: transform 0.5s linear
    }
    .infoBg-enter, .infoBg-leave-to{
    opacity: 0;
    }
    .infoBg-enter-active, .infoBg-leave-active{
    transition: opacity 0.5s linear
    }
    #infor-background{
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);
    }
}

</style>