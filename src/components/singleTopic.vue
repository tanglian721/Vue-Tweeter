<template>
    <div id="singleTopic" @click="toOnetopicPage">
       <span id="num">#{{num+1}}</span> <span id="content">{{Tweet.tag}}</span>
    </div>
</template>

<script>
    export default {
        name: "single-topic",
        props:{
             Tweet:{
                type:Object,
                require:true
            },
               num:Number
        },
        methods: {
            toOnetopicPage(){
                // console.log(this.$router.history.current.path.slice(0,7));
                // if( this.$router.history.current.path.slice(0,7) == '/topic/'){
                this.$router.push("/topic/" + this.Tweet.tag)
                this.$store.commit('detailTopic', this.Tweet.tag );
                // }else{
                // }         
            },
        },
     
    }
</script>

<style lang="scss" scoped>
#singleTopic{
    margin-top: 2vh;
}
#num{
    color: rgb(173, 173, 6);
    font-size: 1.5rem;
}
#content{
    margin-left: 2vw;
    font-size: 1.5rem;
    text-transform: uppercase;
}

@media only screen and (min-width:1366px) {
    #num{
    color: rgb(173, 173, 6);
    font-size: 1.6rem;
}
   #content{
    margin-left: 1vw;
    font-size: 1.6rem;
}
}
</style>