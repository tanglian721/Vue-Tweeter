<template>
    <div id="bottom-bar">
        <img src="../assets/home.png" alt="">
        <img src="../assets/loupe.png" alt="">
        <img src="../assets/email.png" alt="">
    </div>
</template>

<script>
    export default {
        name:"bottom-bar"
    }
</script>

<style lang="scss" scoped>
    #bottom-bar{
        display: inline-flex;
        justify-content: space-evenly;
        img{
            position: relative;
            top: 1.5vh;
            height: 5vh;
        }
    }
</style>