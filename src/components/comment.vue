<template>
    <div id="comment-area">
       <img src="../assets/user (2).png" alt="" id="userImg">
       <div id="text-area">
                <div id="name-date">
                    <h3 id="name" @click="toUserPage">{{ comment.username }}</h3> 
                    <h6 id="date">{{ comment.createdAt }}</h6>
                </div>
                <p id="tweet-text" >{{ comment.content }}</p>
                <div id="comment-like">
                    <h5 id="like">
                        <img src="../assets/heart-red.png" alt="" v-if="likesNumber > 0" @click="getLike">
                        <img src="../assets/heart.png" alt="" v-else @click="getLike">
                        <span id="like-active">{{ likesNumber }}</span>
                    </h5>
                    <h5>
                       <img v-if="comment.username == user.username" id="edit" src="../assets/edit.png" alt="" @click="edit">
                    </h5>
                     <h5>
                       <img v-if="comment.username == user.username" id="delete" src="../assets/delete (1).png" @click="deleteShow">
                    </h5>
                </div>
       </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name:"tweet-comment",
        props:{
            comment:{
                type:Object,
                requried:true
            }
        },
        data() {
            return {
                likesNumber:""
            }
        },
        methods: {
            toUserPage(){
                console.log(this.tweet.userId)
                this.$store.commit("DispalyUserIDget", this.tweet.userId)
                this.$router.push("/user")
            },
            getLike() {
                axios.request({
                    url: "https://tweeterest.ml/api/comment-likes",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                    },
                    data:{
                        "tweetId":this.comment.commentID
                  }
                }).then((response) => {
                    console.log(response.data)
                    this.likesNumber = response.data.length
                    // this.comments = response.data
                    // console.log(this.comments)
                }).catch((error) => {
                    console.log("1212")
                    console.log(error)
                })
            },
            test(){
                console.log(this.user)
            }
        },
        mounted () {
            // this.getLike();
            this.test()
        },
        computed: {
             user() {
                return this.$store.state.userinfo
            },
        },
    }
</script>

<style lang="scss" scoped>
 #comment-area{
        // min-height: 84vh;
        margin-top: 2vh;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 7fr;
        justify-items: center;
        >img{
            width: 8vw;
        }
        #text-area{
            width: 90%;
        #name-date{
          z-index: 6;
              h3{
                  z-index: 6;
                  border-bottom:1px solid rgba($color: #000000, $alpha: 0.2);
                }
               h6{
                 z-index: 6;
               margin-left: 60%;
               }
        }
        }
        #comment-like{
        display: flex;
        margin-top: 2vh;
        h5{
            display: inline-block;
            margin-right: 5vw;
            img{
                width: 4vw;
            }
        }
    }
    }

</style>