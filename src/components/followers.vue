<template>
    <div class="followers" @click="toUserPage">
        <img src="../assets/user (3).png" alt=""><span> {{ followerArray.username }} </span>
    </div>
</template>

<script>
    export default {
        name: "followers-area",
        props:{
               followerArray:{
                type:Object,
                required:true
            },
            
        },
    
    }
</script>

<style lang="scss" scoped>
.followers{
    width: 90%;
    // background-color: #fff;
    margin-left: 5%;
    margin-top: 2vh;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 8fr;
    img{
        height: 6vh;
    };
    span{
        margin-left: 4vw;
        font-size: 1.2rem;
    }
}

</style>