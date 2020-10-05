<template>
    <div id="bottom-bar">
        <img src="../assets/home.png" alt="" @click="home">
        <img src="../assets/loupe.png" alt="" @click="userFollow">
        <img src="../assets/email.png" alt="">
        <img id="createBtn" src="../assets/createBtn.png" @click="createNew">
    </div>
</template>

<script>
    export default {
        name:"bottom-bar",
        methods: {
            createNew() {
                this.$store.commit("createShow")
            },
            home(){
                this.$router.push("/")
            },
            userFollow() {
                this.$router.push("/userfollow")
            }
        },
    }
</script>

<style lang="scss" scoped>
    #bottom-bar{
        position: relative;
        display: inline-flex;
        justify-content: space-evenly;
        img{
            position: relative;
            top: 1.5vh;
            height: 4vh;
        }
    #createBtn{
        position: fixed;
        top: 80vh;
        right: 10vw;
        height: 15vw;
        filter: drop-shadow(2px 2px 5px gray);
    }
    }
</style>