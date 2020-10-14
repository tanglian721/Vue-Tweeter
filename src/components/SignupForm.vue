<template>
    <div>
        <h3>SIGN UP</h3>
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
                birthdate:"YYYY-MM-DD",
                bio:""
            }
        },
        methods: {
            signUpUser() {
                cookies.set(this.username,this.$store.state.portrait[0].path)
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
                    cookies.set("loginToken",response.data.loginToken)
                    cookies.set("logininfo",response.data)
                    this.$store.commit("userinfo")
                    this.$router.push("/")
                }).catch((error)=>{
                    console.log(error)
                })
                
            }
        },
    }
</script>

<style lang="scss" scoped>
h3{
    margin-bottom: 2vh;
}
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
@media only screen and (min-width:768px) {
    input{
        height: 1rem;
        width: 250px;
    }
    textarea{
        width: 255px;
    }
}


</style>