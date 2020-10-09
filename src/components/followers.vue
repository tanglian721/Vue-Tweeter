<template>
    <div class="followers">
      <img :src= Imgpath  alt="">
       <div class="info">
         <h3>{{ followerArray.username }}</h3>
          <p>{{ followerArray.email }}</p>
          <p>{{ followerArray.bio }}</p>
       </div>
    </div>
</template>

<script>
    import cookies from "vue-cookies"
    export default {
        name: "followers-area",
        props:{
            followerArray:{

                type:Object,
                required:true
            }    
        },
        computed: {
           Imgpath() { if(cookies.get(this.followerArray.username)!= undefined){
                return cookies.get(this.followerArray.username) 
            } else {
                return this.$store.state.portrait[0].path
            }
           }
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
    grid-template-columns: 1fr 6fr 1fr;
    img{
        height: 6vh;
        border-radius: 50%;
    };
    h3{
        font-size: 1rem;
    }
    .info{
        margin-left: 4vw;
      p{
        font-size: 0.8rem;
      }
    }  font-size: 1.2rem;
    
}

</style>