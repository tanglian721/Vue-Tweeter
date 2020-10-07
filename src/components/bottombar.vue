<template>
    <div id="bottom-bar">
        <div>
           <img v-if="this.icon == 'homepage'" src="../assets/home_A.png" alt="">
           <img v-else src="../assets/home.png" alt="" @click="home">
        </div>
        <div>
        <img v-if="this.icon == 'userfollow'" src="../assets/userlist_A.png" alt="" >
        <img v-else src="../assets/userlist.png" alt="" @click="userFollow">
        </div>
        <img src="../assets/backBlack.png" alt="" @click="back">
        <img id="createBtn" src="../assets/createBtn.png" @click="createNew">
    </div>
</template>

<script>
    export default {
        name:"bottom-bar",
        props: {
            icon:{
                type:String
            }
        },
        methods: {
            createNew() {
                this.$store.commit("createShow")
            },
            home(){
                this.$router.push("/")
            },
            userFollow() {
                this.$router.push("/userfollow")
            },
            back() {
                  window.history.back();
            },
            test() {
                console.log(this.icon)
            }

        },

    }
</script>

<style lang="scss" scoped>
    #bottom-bar{
        background-color: rgba(59, 59, 59, 0.6);
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