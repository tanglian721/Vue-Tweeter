<template>
    <div id="homepage">
       <div v-if="loginStatus" id="display">
            <transition name="info">
            <info-page v-if="info"></info-page>
            <!-- <info-page></info-page> -->
           </transition>
           <top-bar></top-bar>
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

    export default {
        name:"landing-page",
        components:{
            TopBar,
            BottomBar,
            PageContent,
            InfoPage

        },
        data() {
            return {
                loginStatus: false
            }
        },
        computed: {
            token() {
                return cookies.get("loginToken")
            },
            info(){
                return this.$store.state.infoForm
            },
            
        },
        methods: {
            loginCheck() {
                if(this.token != undefined){
                   this.loginStatus = true
                } else{
                this.$router.push("/signin")
                }
            },
        },
        mounted () {
            this.loginCheck();
        },
    }
</script>

<style lang="scss" scoped>
#homepage{
    width:100vw;
    min-height: 100vh;
    background-color:#EFF7F6;
    position: relative;
    #display{
        position: relative;
    }
    #top-bar{
        position: sticky;
        width: 100%;
        background-color: #B2F7EF;
        height: 8vh;
        top: 0vw;
    }
    #content{
        background-color: wheat;
        min-height: 120vh;;
    }
    #bottom-bar{
        width: 100%;
        position: sticky;
        background-color: white;
        height: 8vh;
        bottom: 0;
    }
     #info-page{
    z-index: 99;
    width: 60vw;
    height: 60vh;
    background-color:white;
    position: fixed;
    left: 0;
    top: 0;
    // transform: translateX(-100%);
    }
    .info-enter, .info-leave-to{
    transform: translateX(-100%);
    }
    .info-enter-active, .info-leave-active{
    transition: transform 0.5s linear
    }
}

</style>