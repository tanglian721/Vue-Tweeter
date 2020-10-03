<template>
    <div id="edit-tweet">
        <img id="delete" src="../assets/delete.png" alt="" @click="backHome">
        <div v-if="submit === 'on'" id="text-area">
        <img id="userImg" src="../assets/user (2).png">
        <textarea name="" id="editTweet" cols="30" rows="10" v-model="editTweet.content"></textarea>
        </div>
        <div class="message" v-else-if="submit === true">
            <h2 >Tweet Editd Sucessful!</h2>
            <span @click="backHome" >Back</span>   
        </div>
        <div class="message" v-else-if="submit === false">
            <h2 > {{errorInfo}}   </h2>
            <span @click="reEdit" >Write Again</span>   
        </div>
        <button id="submit" @click="tweetEdit">tweet</button>
    </div>
</template>

<script>
    import cookies from "vue-cookies"
    import axios from "axios"
    export default {
        name: "edit-tweet",
        data() {
            return {
                textContent:"What's happening?",
                submit:"on",
                errorInfo:"",
            }
        },
        props:{
            editTweet:{
               type:Object,
               requried: true
            },
        },
        methods: {
            test() {
               console.log(this.token)
               console.log(this.editTweet.tweetId)
               console.log(this.editTweet.content)
            },
            tweetEdit(){
                axios.request({
                    url:"https://tweeterest.ml/api/tweets",
                    method:"patch",
                    headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                  data:{
                    "loginToken": this.token,
                    "tweeId": this.editTweet.tweetId,
                    "content": this.editTweet.content
                  }
                }).then((response)=>{
                    console.log(response)
                    this.submit = true
                }).catch((errorMessage)=>{
                    this.submit = false,
                    console.log(errorMessage)
                    this.errorInfo = errorMessage
                })
            },
            reEdit(){
                this.submit = "on"
            },
            backHome(){
                this.$emit('display', false)
            },
        },
        computed: {
            token() {
                return cookies.get("loginToken")
            }
        }
    }
</script>

<style lang="scss" scoped>
#edit-tweet{
    box-sizing: border-box;
    #delete{
        width: 5vw;
        position: relative;
        margin: 2vh 5vw 1vh 5vw;
    }
    #text-area{
        position: relative;
        min-height: 18vh;
        #userImg{
            width: 10vw;
            margin-left: 5%;
            position: absolute;
            top: 0;
        }
        textarea{
            border: none;
            box-sizing: border-box;
            width: 70%;
            height: 70%;
            margin-left: 20%;
        }
    }
    #submit{
        background-color: #B2F7EF;
        border: none;
        color: white;
        padding: 0.4rem;
        border-radius: 04rem;
        margin-left:70%;
        margin-top: 1vh;
    }
    .message{
        display: grid;
        align-items: center;
        justify-items: center;
        width: 80%;
        min-height: 18vh;
        margin-left: 10%;
        span{
            width: 20vw;
            height: 2vh;
            padding: 2vw;
            line-height: 2vh;
            background-color: #f2b5d4;
            border-radius: 04rem;
            font-size: 1rem;
            color: white; 
        }
    }
}
 

</style>