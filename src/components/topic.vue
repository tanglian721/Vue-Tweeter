<template>
    <div id="topic">
     <h1># TOP topic!</h1>
     <single-topic v-for="(tweet,index) in tweets" :key="tweet.tag" :Tweet="tweet" :num="index"></single-topic>  
    </div>
</template>

<script>
import SingleTopic from "../components/singleTopic.vue"
    export default {
        name: "topic-tweet",
        components: {
            SingleTopic
        },
        data() {
            return {
                // tweets: this.$store.getters.hashtagTopic,
           
            }
        },
        props:{
            Tweet:{
                type:Object,
                require:true
            },
            num:Number
            
        },
        computed: {
            tweets() {
               return this.$store.getters.hashtagTopic;
             } 
            
        },
        mounted () {
            console.log(this.tweets)
        },
    }
</script>

<style lang="scss" scoped>
#topic{
    h1{
        text-align: center;
        margin-top: 5vh;
    }
    #singleTopic{
        width: 80%;
        margin-left: 15%;
    }
    min-height: 84vh;
}
@media only screen and (min-width:760px){
#topic{
    h1{
        margin-top: 15vh;
    }
}
}

@media only screen and (min-width:1366px) {
    
    #singleTopic{
        width: 50%;
        margin-left: 25%;
    }


}

</style>