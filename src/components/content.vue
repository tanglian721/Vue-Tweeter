<template>
  <div id="content">
    <img v-if="loadingImg" id="load" src="../assets/loading.gif" alt="" />
    <div v-if="TrendingDisplay">
      <single-tweet
        class="tweet"
        v-for="(tweet, index) in tweetsByComments"
        v-bind:key="tweet.tweetId"
        :tweet="tweet"
        :index="index"
        @fakeDelete="fakeDelete"
      ></single-tweet>
    </div>
    <div v-else>
      <single-tweet
        class="tweet"
        v-for="(tweet, index) in tweets"
        v-bind:key="tweet.tweetId"
        :tweet="tweet"
        :index="index"
        @fakeDelete="fakeDelete"
      ></single-tweet>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import SingleTweet from "./tweet";
import axios from "axios";
export default {
  name: "page-content",
  components: {
    SingleTweet
  },
  data() {
    return {
      loadingImg: false
    };
  },
  props: {
    tweet: {
      type: Object,
      requried: true
    },
    index:Number
  },
  methods: {
    fakeDelete(data) {
      this.tweets.splice(data,1);
    },
    getComments(tweet) {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          params: {
            tweetId: tweet.tweetId
          }
        })
        .then(response => {
          tweet.commentstAmount = response.data.length;
          let Array = this.$store.state.allTweets.map(tweet => tweet.tweetId);
          if (Array.includes(tweet.tweetId) == false) {
            this.$store.commit("pushAllTweet", tweet);
          }
          this.loadingImg = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLike(tweet) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          params: {
            tweetId: tweet.tweetId
          }
        })
        .then(response => {
          tweet.likeAmount = response.data.length;
          tweet.ifLike = false;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].username == this.userinfo.username) {
              tweet.ifLike = true;
            }
          }

          this.getComments(tweet);
        })
        .catch(error => {
          console.log(error);
        });
    },
    forEachTweet(tweetsArray) {
      for (let i = 0; i < tweetsArray.length; i++) {
        this.getLike(tweetsArray[i]);
      }
    },
    alltweetGet() {
      this.loadingImg = true;
      this.$store.commit("clearAllTweet");
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          }
        })
        .then(response => {
          this.forEachTweet(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    tweets() {
      return this.$store.getters.tweetAllByDate;
    },
    tweetsByComments() {
      return this.$store.getters.tweetAllByLike;
    },
    userinfo() {
      return cookies.get("logininfo");
    },
    TrendingDisplay() {
      return this.$store.state.TrendingDisplay;
    }
  },
  mounted() {
    this.alltweetGet();
  }
};
</script>

<style lang="scss" scoped>
#content {
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
