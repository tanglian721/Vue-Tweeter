<template>
    <div id="top-bar">
        <div id="top-bar-icons">
            <img @click="infoDisplay" id="userImg" :src= Imgpath alt="">
            <div>
            <img v-if="this.ifTopic" src="../assets/topic.png" alt="" @click="topic">
            <img v-else src="../assets/topic_A.png" alt="" @click="topic">
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
                Imgpath:cookies.get(cookies.get("logininfo").username),
                ifTopic:false
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
                this.$emit('topic', this.ifTopic);
                this.ifTopic = !this.ifTopic;
            }
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