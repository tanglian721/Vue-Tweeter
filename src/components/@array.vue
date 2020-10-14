<template>
  <div class="userlist" @click="selectUser">
    <img :src="Imgpath" alt="" />
    <div class="info">
      <h3>{{ userArray.username }}</h3>
      <p>{{ userArray.email }}</p>
      <p>{{ userArray.bio }}</p>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  name: "user-array",
  data() {
    return {};
  },
  props: {
    userArray: {
      type: Object,
      require: true
    }
  },
  methods: {
    test() {
      console.log(this.Imgpath);
    },
    selectUser() {
      console.log(this.userArray);
      this.$emit("selectuser", this.userArray);
    }
  },
  computed: {
    Imgpath() {
      if (cookies.get(this.userArray.username) != undefined) {
        return cookies.get(this.userArray.username);
      } else {
        return this.$store.state.portrait[0].path;
      }
    }
  },
  mounted() {
    this.test();
  }
};
</script>

<style lang="scss" scoped>
.userlist {
  width: 90%;
  height: 6vh;
  margin-left: 5%;
  margin-top: 2px;
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 6fr;
  overflow: hidden;

  img {
    height: 6vh;
    border-radius: 50%;
  }

  h3 {
    font-size: 1rem;
  }

  .info {
    margin-left: 4vw;

    p {
      font-size: 0.8rem;
    }
  }

  font-size: 1.2rem;
}
</style>
