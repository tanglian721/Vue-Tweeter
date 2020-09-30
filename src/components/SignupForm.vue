<template>
    <div>
        <p>Email</p>
       <input type="text" id="email" v-model="email">
        <p>Username</p>
       <input type="text" id="username" v-model="username">
        <p>Password</p>
       <input type="password" id="password" v-model="password">
        <p>Birthday</p>
       <input type="text" id="birthday" v-model="birthdate">
        <p>Bio</p>
       <textarea name="" id="bio" cols="30" rows="10" v-model="bio"></textarea>
       <div id="signUpBtn"    @click="signUpUser">Sign Up</div>
    </div>
</template>

<script>
import signUpApi from "axios"
import cookies from "vue-cookies"
    export default {
        name: "signup-form",
        data() {
            return {
                email: "",
                username:"",
                password:"",
                birthdate:"",
                bio:""
            }
        },
        methods: {
            signUpUser() {
                signUpApi.request({
                  url:"https://tweeterest.ml/api/users",
                  method:"post",
                  headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                  data:{
                    "email":this.email,
                    "username":this.username,
                    "password":this.password,
                    "birthdate":this.birthdate,
                    "bio":this.bio
                  }
                }).then((response)=>{
                    console.log(response)
                    cookies.set("token",response.data[0].loginToken)

                }).catch((error)=>{
                    console.log(error)
                })
                
            }
        },
    }
</script>

<style lang="scss" scoped>

input,textarea{
    width: 80%;
}
#signUpBtn{
    margin-top: 1vh;
    background-color:#00ffe1;
    padding: 5px 10px;
    border-radius: 10px;
    color: white;
    filter: drop-shadow(2px 2px 5px gray);
}


</style>