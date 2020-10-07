<template>
    <div>
     <img class="img" :src= portrait.path alt="" @click="selectImg"> 
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name:"single-portrait",
        props: {
            portrait:{
                type:Object,
                required:true
            }
        },
        data() {
            return {
            }
        },
        methods: {
            selectImg() {
                cookies.set(cookies.get("logininfo").username, this.portrait.path)         
            }
        },
   
    }
</script>

<style lang="scss" scoped>
   .img{
       width: 15vw;
       border-radius: 50%;
       filter: drop-shadow(2px 2px 5px gray);
       &:active{
             filter: none;
       }
       
   }
</style>