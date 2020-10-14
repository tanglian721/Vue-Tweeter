<template>
  <div id="profile">
    <div id="top">
      <div id="back" @click="backHome">
        <img src="../assets/back.png" alt="" />
      </div>
    </div>
    <profile-edit></profile-edit>
  </div>
</template>

<script>
import ProfileEdit from "../components/profileEdit";
export default {
  name: "profile-page",
  components: {
    ProfileEdit
  },
  methods: {
    backHome() {
      this.$router.push("/");
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
#profile {
  height: 100vh;
  overflow: hidden;
}

#top {
  width: 100%;
  height: 20vh;
  background-color: #b2f7ef;

  #back {
    position: relative;
    top: 5vw;
    left: 5vw;
    width: 8vw;
    height: 8vw;
    background-color: rgba($color: #000000, $alpha: 0.5);
    border-radius: 50%;

    img {
      width: 4vw;
      margin: 2vw;
    }
  }
}

@media only screen and (min-width: 760px) {
  #top {
    #back {
      top: 2vw;
      left: 2vw;
      width: 4vw;
      height: 4vw;

      img {
        width: 2vw;
        margin: 1vw;
      }
    }
  }
}

@media only screen and (min-width: 1366px) {
}
</style>
