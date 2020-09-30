<template>
    <div id="info-page">
        <img id="userImg" src="../assets/user.png" alt="">
        <div id="userInfo">
            <p id="user">user</p>
            <p id="email">user@gmail.com</p>
            <p id="follow">
               <span id="following">following : 2</span>
               <span id="follower"> follower :4</span>
            </p>
        </div>
        <div id="userFunction">
             <h3 id="profile">
                 <img src="../assets/user (1).png" alt="">
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
        <button @click="infoDisplay">HIDE</button>
    </div>
</template>

<script>
    export default {
        name:"info-page",
        methods: {
            infoDisplay() {
                console.log("1")
                this.$store.commit("infoHide")
            }
        },
    }
</script>

<style lang="scss" scoped>
#info-page{
    display: grid;
    align-content: start;

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
           padding-left: 5vw;
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
}
button{
    position: absolute;
    right: 10vw;
    bottom: 2vh;
}

</style>