<template>
  <div id="Sign-in-page">
    <div id="img">
      <img src="../assets/logo.png" />
    </div>
    <login-form id="login-form"></login-form>
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutUp"
    >
      <signup-form v-if="signUp" id="sign-up"></signup-form>
    </transition>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/loginform";

export default {
  name: "signin-page",
  components: {
    SignupForm,
    LoginForm
  },
  computed: {
    signUp() {
      return this.$store.state.signUpForm;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);

#Sign-in-page {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  align-items: center;
  justify-items: center;

  img {
    position: relative;
    width: clamp(200px, 60vw, 300px);
    top: 10vh;
  }

  #login-form {
    position: relative;
    top: -10vh;
    align-items: center;
    justify-items: center;
    display: grid;
  }

  #sign-up {
    box-sizing: border-box;
    position: absolute;
    border: 1px solid gray;
    padding: 5vw;
    background-color: white;
    border-radius: 5vw;
    display: grid;
    align-items: center;
    justify-items: center;
    top: 16vh;
    filter: drop-shadow(10px 10px 15px gray);
  }
}

@media only screen and (min-width: 760px) {
  #login-form {
    position: relative;
    top: 20vh;
    align-items: center;
    justify-items: center;
    display: grid;
  }
}

@media only screen and (min-width: 1366px) {
  #Sign-in-page {
    grid-template-columns: 1fr 1fr;

    #img {
      width: 100%;
      height: 100%;
      background-color: rgba(163, 217, 219, 0.637);

      > img {
        width: 50%;
        margin-left: 25%;
        margin-top: 20vh;
      }
    }

    #login-form {
      top: 0;
    }
  }
}
</style>
