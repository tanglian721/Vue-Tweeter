<template>
    <div id="top-bar">
        <div id="top-bar-icons">
            <img @click="infoDisplay" id="userImg" :src= Imgpath alt="">
            <div>
               <img v-if="TrendingDisplay"  src="../assets/trending_A.png" alt="" @click="topic">
               <img v-else src="../assets/trending.png" alt="" @click="topic">
            </div>
            <img  id="refresh" src="../assets/logo.png" alt="" @click="refresh">
    </div>
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name:"top-bar",
        components:{
        },
        data() {
            return {
            }
        },
        methods: {
            infoDisplay() {
                this.$store.commit("infoShow")
            },
            refresh(){
                 location.reload();
            },
            topic() {
                this.$store.commit("switchTrending");
            }
        },
        computed: {
            Imgpath() { if(cookies.get(cookies.get("logininfo").username)!= undefined){
                return cookies.get(cookies.get("logininfo").username) 
            } else {
                return this.$store.state.portrait[0].path
            }
            },
            TrendingDisplay() {
                return this.$store.state.TrendingDisplay
            }
        },
        mounted () {
        },
    }
</script>

<style lang="scss" scoped>
#top-bar-icons{
    width: 90%;
    margin-left: 5%;
    position: relative;
    display: inline-flex;
    justify-content: space-between;
    img{
        position: relative;
        top: 2vh;
        height: 4vh;
        }     
    #userImg{
        height: 6vh;
        position: relative;
        top: 1vh;
        border-radius: 50%;
    }

  
}

</style>