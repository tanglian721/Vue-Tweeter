<template>
    <div id="top-bar">
    <img @click="infoDisplay" id="userImg" src="../assets/user.png" alt="">
    <img  id="refresh" src="../assets/logo.png" alt="">
    </div>
</template>

<script>
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
            }
        },
    }
</script>

<style lang="scss" scoped>
#top-bar{
    #userImg{
        height: 6vh;
        margin: 1vh 5vw;
    }
    #refresh{
        position: relative;
        left: 55vw;
        height: 5vh;
        margin: 1.5vh 5vw;
    }
  
}

</style>