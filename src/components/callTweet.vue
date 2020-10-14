<template>
  <div id="called-tweets">
    <img v-if="loadingImg" id="load" src="../assets/loading.gif" alt="" />
    <single-tweet
      class="tweet"
      v-for="tweet in tweets"
      v-bind:key="tweet.tweetId"
      :tweet="tweet"
    ></single-tweet>
  </div>
</template>

<script>
import SingleTweet from "./tweet";

export default {
  name: "called-tweets",
  components: {
    SingleTweet
  },
  data() {
    return {
      loadingImg: false
    };
  },
  computed: {
    tweets() {
      return this.$store.getters.noticeTweet;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
#called-tweets {
  display: grid;
  justify-items: center;
  align-content: start;
  overflow: hidden;
}

.tweet {
  box-sizing: border-box;
  padding: 2vh;
}

#load {
  margin-top: 30vh;
  width: 30%;
}

@media only screen and (min-width: 768px) {
  .tweet {
    width: 90%;
    margin-left: 5%;
  }
}

@media only screen and (min-width: 1366px) {
  .tweet {
    width: 80%;
    margin-left: 10%;
  }

  #load {
    margin-left: 30%;
  }
}
</style>
