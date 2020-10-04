<template>
    <div class="followers">
      <img src="../assets/user (3).png" alt="">
       <div class="info">
         <h3>{{ followerArray.username }}</h3>
          <p>{{ followerArray.email }}</p>
          <p>{{ followerArray.bio }}</p>
       </div>
    </div>
</template>

<script>
    export default {
        name: "followers-area",
        props:{
            followerArray:{
                
                type:Object,
                required:true
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