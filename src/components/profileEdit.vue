<template>
  <div id="profile-show">
    <img id="userImg" :src="Imgpath" alt="" />
    <span id="editBtn" @click="edit = !edit"> Edit Profile </span>
    <div id="userInfo">
      <p id="user">
        Username:
        <input v-if="edit" type="text" v-model="user" />
        <span v-else>{{ user }}</span>
      </p>
      <p id="email">
        Email:
        <input v-if="edit" type="text" v-model="email" />
        <span v-else>{{ email }}</span>
      </p>
      <p id="birthday">
        birthdate:
        <input v-if="edit" type="text" v-model="birthdate" />
        <span v-else>{{ birthdate }}</span>
      </p>
      <p id="bio">
        Bio:
        <textarea class="bio" v-if="edit" type="text" v-model="bio"></textarea>
        <span class="bio" v-else>{{ bio }}</span>
      </p>
      <p id="follow">
        <span id="following">following : 2</span>
        <span id="follower"> follower :4</span>
      </p>
      <portrait-set v-if="edit" id="portrait-set"></portrait-set>
    </div>
    <span id="submit" v-if="edit" @click="signUpUser">Submit</span>
    <span id="password" v-if="edit" @click="inputPassword">Delete</span>
    <div v-if="deleteShow" id="deleteConfirm">
      <h2 v-if="deleteFalse == 'failed'">Delete failed!</h2>
      <h2 v-else-if="deleteFalse == 'success'">Delete Success!</h2>
      <div v-else>
        <p>Please input your password:</p>
        <input type="password" v-model="password" />
        <div id="btns">
          <span id="deleteBTN" @click="back">Back</span>
          <span id="deleteBTN" @click="deleteUser">Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PortraitSet from "../components/portraitSet";
import cookies from "vue-cookies";
import signUpApi from "axios";

export default {
  name: "profile-edit",
  components: {
    PortraitSet
  },
  data() {
    return {
      user: "name",
      email: "email",
      birthdate: "birthdate",
      bio: "bio",
      edit: false,
      deleteShow: false,
      deleteFalse: "on",
      password: "123321"
    };
  },
  methods: {
    loading() {
      (this.user = this.userinfo.username),
        (this.email = this.userinfo.email),
        (this.birthdate = this.userinfo.birthdate),
        (this.bio = this.userinfo.bio);
    },
    signUpUser() {
      signUpApi
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "patch",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: this.token,
            email: this.email,
            username: this.user,
            birthdate: this.birthdate,
            bio: this.bio
          }
        })
        .then(response => {
          console.log(response.data);
          cookies.set("logininfo", response.data);
          this.edit = false;
          location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    },
    inputPassword() {
      this.deleteShow = "password";
    },
    back() {
      this.deleteShow = false;
    },
    deleteUser() {
      signUpApi
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: this.token,
            password: this.password
          }
        })
        .then(() => {
          this.deleteFalse = "success";
          setTimeout(() => {
            cookies.remove("logininfo");
            cookies.remove("loginToken");
            this.$store.commit("clearAllTweet");
            this.$store.commit("signUpHide");
            this.$router.push("/signin");
          }, 1000);
        })
        .catch(error => {
          console.log(error);
          this.deleteFalse = "failed";
          setTimeout(() => {
            this.deleteShow = false;
            this.deleteFalse = "on";
          }, 1000);
        });
    }
  },
  computed: {
    userinfo() {
      return cookies.get("logininfo");
    },
    token() {
      return cookies.get("loginToken");
    },
    Imgpath() {
      if (cookies.get(cookies.get("logininfo").username) != undefined) {
        return cookies.get(cookies.get("logininfo").username);
      } else {
        return this.$store.state.portrait[0].path;
      }
    }
  },
  mounted() {
    this.loading();
    console.log(this.deleteShow);
  }
};
</script>

<style lang="scss" scoped>
#profile-show {
  position: relative;

  #userImg {
    width: 25vw;
    position: relative;
    top: -13vw;
    left: 5vw;
    border-radius: 50%;
  }

  #editBtn {
    border: 1px solid black;
    border-radius: 1rem;
    padding: 3px;
    position: absolute;
    top: 1vh;
    right: 5vw;
  }

  #userInfo {
    position: relative;
    left: 10vw;

    p {
      width: 70%;
      font-size: 1.2rem;
      margin-bottom: 2vh;
    }
  }

  .bio {
    width: 50vw;
    height: 20vw;
  }

  #submit,
  #password {
    position: relative;
    background-color: #b2f7ef;
    border: none;
    color: white;
    padding: 0.4rem;
    border-radius: 04rem;
    margin-left: 10vw;
    top: 4vh;
    filter: drop-shadow(2px 2px 5px gray);

    &:active {
      filter: none;
    }
  }

  #portrait-set {
    width: 70vw;
  }

  #deleteConfirm {
    box-sizing: border-box;
    padding: 30px;
    border-radius: 30px;
    background-color: white;
    filter: drop-shadow(2px 2px 5px gray);
    position: fixed;
    top: 30vh;
    width: 60%;
    left: 20%;

    #btns {
      display: flex;
      justify-content: space-evenly;

      #deleteBTN {
        border: none;
        color: white;
        padding: 0.4rem;
        border-radius: 04rem;
        margin-top: 2vh;
        position: relative;
        background-color: #b2f7ef;
        filter: drop-shadow(2px 2px 5px gray);

        &:active {
          filter: none;
        }
      }
    }
  }
}

@media only screen and (min-width: 760px) {
  #profile-show {
    #userImg {
      left: 15vw;
    }

    #editBtn {
      transform: scale(1.5);
      top: 3vh;
      right: 10vw;
    }

    #userInfo {
      top: -8vh;
      left: 30vw;

      p {
        transform: scale(1.2);
      }
    }

    .bio {
      width: 30vw;
      height: 10vw;
    }

    #submit,
    #password {
      font-size: 1.5rem;
      margin-left: 20vw;
      top: -6vh;
    }

    #portrait-set {
      position: relative;
      left: -12vw;
    }

    #deleteConfirm {
      p,
      input {
        width: 100%;
        font-size: 1.2rem;
      }

      width: 35%;
      left: 37%;
    }
  }
}

@media only screen and (min-width: 1366px) {
  #profile-show {
    #userImg {
      left: 15vw;
      width: 10vw;
      top: -5vw;
    }

    #editBtn {
      transform: scale(1.5);
      top: 3vh;
      right: 10vw;
    }

    #userInfo {
      top: 0;
      left: 30vw;

      p {
        transform: scale(1.2);
      }
    }

    .bio {
      width: 15vw;
      height: 8vw;
    }

    #submit {
      margin-left: 25vw;
      top: -12vh;
    }

    #password {
      margin-left: 10vw;
      top: -12vh;
    }

    #portrait-set {
      position: relative;
      width: 30vw;
      left: 20vw;
      top: -30vh;
    }

    #deleteConfirm {
      width: 20%;
      left: 40%;
    }
  }
}
</style>
