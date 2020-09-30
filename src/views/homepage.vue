<template>
    <div id="homepage">
       <div v-if="loginStatus">
           <top-bar></top-bar>
           <page-content></page-content>
           <bottom-bar></bottom-bar>
           <info-page></info-page>
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
            }
        },
        methods: {
            loginCheck() {
                if(this.token != undefined){
                   this.loginStatus = true
                } else{
                this.$router.push("/signin")
                }
            }
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
    #top-bar{
        position: sticky;
        background-color: #B2F7EF;
        height: 8vh;
        top:0
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
        width: 60vw;
        height: auto;
        min-height: 50vh;
        position: absolute;
        top: 0;
        left: 0;
    }
}

</style>