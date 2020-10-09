<template>
    <div id="Sign-in-page">
       <img src="../assets/logo.png">
       <login-form id="login-form"></login-form>
        <transition  enter-active-class="animate__animated animate__bounceInDown" leave-active-class="animate__animated animate__bounceOutUp">
           <signup-form v-if="signUp" id="sign-up"></signup-form>
        </transition>

    </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue"
import LoginForm from "../components/loginform"

    export default {
       name: "signin-page",
       components:{
           SignupForm,
           LoginForm
       },
       computed: {
           signUp() {
               return this.$store.state.signUpForm 
           }
       },

    }
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);
#Sign-in-page{
    position: relative;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: grid;
    align-items: center;
    justify-items: center;
    img{
       position: relative;
       width: 60vw;
       top: 10vh;
    }
    #login-form{
       position: relative;
       top: -10vh;
       align-items: center;
       justify-items: center;
       display: grid;
    }
    #sign-up{
        box-sizing: border-box;
        position: absolute;
        border: 1px solid gray;
        padding: 5vw;
        background-color: white;
        border-radius: 5vw;
        width: 70vw;
        display: grid;
        align-items: center;
        justify-items: center;
        top: 20vh;
        filter: drop-shadow(10px 10px 15px gray);
    }
}


</style>