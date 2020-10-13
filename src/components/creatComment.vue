<template>
    <div id="write-area">
      <img class="img" :src= Imgpath alt="" id="userImg">
      <div id="write-comment">
                        <div class="submit" v-if="submit == 'on'">
                            <textarea name="" id="new-comment" cols="30" rows="4" v-model="commentContent" ></textarea>
                            <br>
                            <button id="create" @click="createComment">submit</button>
                        </div>
                        <div class="submit" v-else-if="submit == true">
                             <h2 >Comment Created Sucessful!</h2>
                        </div>
                        <div class="submit" v-else-if="submit == false">
                            <h2 >{{submit}} </h2>
                            <span @click="reCreate" >Write Again</span>   
                        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
    export default {
        name:"create-comment",
        data() {
            return {
                submit:"on",
                commentContent:"What is your comment",
            }
        },
        props: {
            tweetId: Number
        },
        computed: {
             user() {
                return cookies.get("logininfo");
            },
            Imgpath() { if(cookies.get(this.user.username)!= undefined){
                return cookies.get(this.user.username) 
               } else {
                return this.$store.state.portrait[0].path
              }
            },
        },
        methods: {
            reCreate(){
                this.submit = "on"
            },
            createComment(){
                axios.request({
                    url:"https://tweeterest.ml/api/comments",
                    method:"post",
                    headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                    data:{
                    "loginToken": cookies.get("loginToken"),
                    "tweetId": this.tweetId,
                    "content": this.commentContent
                  }
                }).then((response)=>{
                    console.log(response)
                    this.submit = true
                   location.reload();
                }).catch((errorMessage)=>{
                    this.submit = false,
                    console.log(errorMessage)
                    this.errorInfo = errorMessage
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
   #write-area{
        margin-top: 2vh;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 7fr;
       .img{
           justify-self: center;
          border-radius: 50%;
           width: 8vw;
        }
   
   }
   @media only screen and (min-width:768px){
     #comment-area{
         .img{
             width:5vw;
         }
         textarea{
             font-size: 1.2rem;
         }
     }
}
@media only screen and (min-width:1366px) {
     #comment-area{
         .img{
             width:3vw;
         }
     }
}

</style>