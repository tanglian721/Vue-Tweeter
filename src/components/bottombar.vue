<template>
    <div id="bottom-bar">
        <div>
           <img v-if="this.$router.history.current.path == '/'" src="../assets/home_A.png" alt="" @click="toall">
           <img v-else src="../assets/home.png" alt="" @click="home">
        </div>
        <div>
        <img v-if="this.$router.history.current.path == '/userfollow'" src="../assets/userlist_A.png" alt="" >
        <img v-else src="../assets/userlist.png" alt="" @click="userFollow">
        </div>
        <div id="at" @click="toCallPage">
            <img src="../assets/at.png" alt="">
            <p v-if="this.newNumber > 0" id="number">{{ newNumber }}</p>
        </div>
        <div>
        <img v-if="topicDisplay" src="../assets/backBlack.png" alt=""  @click="toall">
        <img v-else src="../assets/backBlack.png" alt=""  @click="back">
        </div>
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
        computed: {
            newNumber() {
                return this.$store.getters.noticeTweet.length
            },
             topicDisplay() {
                return this.$store.state.topicdisplay
            },
        },
        methods: {
            createNew() {
                this.$store.commit("createShow")
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
                this.$router.push("/calledpage")
            },
            back() {
                console.log("asa")
                  window.history.back();
            },
            test() {
                console.log(this.icon)
            },
            toall() {
                this.$store.commit("topicHide");               

            }

        },
     

    }
</script>

<style lang="scss" scoped>
    #bottom-bar{
        background-color: rgba(122, 122, 122, 0.6);
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
        height: clamp(40px, 15vw, 80px);
        filter: drop-shadow(2px 2px 5px gray);
    }
    }
    #at{
        position: relative;
        #number{
            position: absolute;
            top: 0;
            right: -2vw;
            font-size: 1.5rem;
            color:red;
        }
    }
</style>