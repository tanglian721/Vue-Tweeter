<template>
  <div @keypress.enter="loginUser">
    <p>Email</p>
    <input type="text" id="email-input" v-model="email" />
    <p>Password</p>
    <input type="password" id="password-input" v-model="password" />
    <div id="buttons">
      <img src="../assets/enter.png" @click="loginUser" />
      <img src="../assets/signUp.png" @click="signUpForm" />
    </div>
    <h3>{{ loginStatus }}</h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "login-form",
  data() {
    return {
      email: "",
      password: "",
      loginStatus: ""
    };
  },
  methods: {
    loginUser() {
      this.loginStatus = "Loading";
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          console.log(response);
          this.loginStatus = "Success";
          cookies.set("loginToken", response.data.loginToken);
          cookies.set("logininfo", response.data);
          this.$store.commit("userinfo");
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
          this.loginStatus = "Error";
        });
    },
    signUpForm() {
      this.$store.commit("signUpDisplay");
    }
  },
  computed: {
    signUp() {
      return this.$store.state.signUpForm;
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: clamp(30px, 10vw, 50px);
}

#buttons {
  margin-top: 3vh;
  width: 50vw;
  display: flex;
  justify-content: space-evenly;
}

@media only screen and (min-width: 768px) {
  input {
    font-size: 1.5rem;
    height: 2rem;
    width: clamp(180px, 15vw, 250px);
  }

  p {
    font-size: 1.5rem;
    margin: 1vh 0;
  }

  #buttons {
    width: clamp(180px, 15vw, 250px);
  }
}
</style>
