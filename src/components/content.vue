<template>
    <div id="content">
        <single-tweet id="tweet"></single-tweet>      
    </div>
</template>

<script>
    import SingleTweet from "./tweet.vue"
    export default {
        name:"page-content",
        components:{
            SingleTweet
        }
    }
</script>

<style lang="scss" scoped>
#content{
    display: grid;
    justify-items: center;
    align-content: start;
    overflow: hidden;
}
#tweet{
    box-sizing: border-box;
    width: 90%;
    background-color: white;
    padding: 2vh;
}

</style>