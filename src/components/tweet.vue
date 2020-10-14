<template>
  <div>
    <div id="tweet-content">
      <img class="img" :src="Imgpath" alt="" id="userImg" />
      <div id="text-area">
        <div id="name-date">
          <h3 id="name" @click="toUserPage">{{ tweet.username }}</h3>
          <h6 id="date">{{ tweet.createdAt.slice(0, 16) }}</h6>
        </div>
        <p id="tweet-text" v-html="this.content"></p>
        <div id="comment-like">
          <h5 id="comment">
            <img src="../assets/speech.png" alt="" @click="commentShow" />
            <span id="comment-number">{{ tweet.commentstAmount }}</span>
          </h5>
          <h5 id="like">
            <div v-if="tweet.ifLike">
              <img src="../assets/heart-red.png" alt="" @click="unlike" />
              <span id="like-active">{{ tweet.likeAmount }}</span>
            </div>
            <div v-else>
              <img src="../assets/heart.png" alt="" @click="like" />
              <span id="like-active">{{ tweet.likeAmount }}</span>
            </div>
          </h5>
          <h5>
            <img
              v-if="tweet.username == user.username"
              id="edit"
              src="../assets/edit.png"
              alt=""
              @click="edit"
            />
          </h5>
          <h5>
            <img
              v-if="tweet.username == user.username"
              id="delete"
              src="../assets/delete (1).png"
              @click="deleteShow"
            />
          </h5>
        </div>
        <transition
          enter-active-class="animate__animated animate__bounceInDown"
          leave-active-class="animate__animated animate__bounceOutUp"
        >
          <div id="deleteDiv" v-if="deleteDisplay">
            <div v-if="deleteStatus == 'on'" class="message">
              <h2>Are you sure to delete this tweet?</h2>
              <span @click="backHome" id="back">Back</span>
              <span @click="deleteTweet">DELETE</span>
            </div>
            <div v-else-if="deleteStatus == true" class="message">
              <h2>Tweet deleted successful!</h2>
              <span @click="backHome" id="back">Back</span>
            </div>
            <div v-else-if="deleteStatus == false" class="message">
              <h2>{{ errorInfo }}</h2>
              <span @click="backHome" id="back">Back</span>
              <span @click="deleteTweet">DELETE AGAIN</span>
            </div>
          </div>
        </transition>
        <transition
          enter-active-class="animate__animated animate__bounceInDown"
          leave-active-class="animate__animated animate__bounceOutUp"
        >
          <edit-tweet
            v-if="editDisplay"
            :editTweet="tweet"
            @display="editHide"
            @reload="reload"
          ></edit-tweet>
        </transition>

        <div v-if="commentDisplay" id="comment-area">
          <div id="comment-splitter"></div>
          <tweet-comment
            v-for="comment in comments"
            :key="comment.commentID"
            :comment="comment"
          ></tweet-comment>
          <create-comment :tweetId="this.tweet.tweetId"></create-comment>
        </div>
      </div>
    </div>
    <div id="splitter"></div>
  </div>
</template>

<script>
import TweetComment from "./comment.vue";
import EditTweet from "./editTweet.vue";
import CreateComment from "./creatComment.vue";
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "single-tweet",
  components: {
    TweetComment,
    EditTweet,
    CreateComment
  },
  data() {
    return {
      text:
        " <span @click='tsdasda'>Back</span> hahaah<h2 id='haha' @click='open(51)''><u>@taylor</u></h2>",
      comments: [],
      editDisplay: false,
      deleteDisplay: false,
      commentDisplay: false,
      commentsNumber: "",
      likesNumber: "",
      likeCheck: false,
      deleteId: "",
      deleteStatus: "on",
      errorInfo: "",
      content:this.tweet.content
    };
  },
  props: {
    tweet: {
      type: Object,
      requried: true
    },
    editTweet: {
      type: Object,
      requried: true
    },
    comment: {
      type: Object,
      requried: true
    },
    tweetId: Number,
    index:Number,
  },
  methods: {
    open(data) {
      console.log("dsa");
      console.log(data);
      cookies.set("userpageId", data);
      this.$router.push("/user");
    },
    test() {
      console.log("dsad");
    },
    edit() {
      this.editDisplay = true;
    },
    reload(data) {
      console.log(data);
      this.content = data;
      this.editDisplay = false;
    },
    editHide(childData) {
      this.editDisplay = childData;
    },
    deleteShow() {
      this.deleteDisplay = true;
      this.deleteId = this.tweet.tweetId;
    },
    backHome() {
      this.deleteDisplay = false;
    },
    toUserPage() {
      this.$store.commit("DispalyUserIDget", this.tweet.userId);
      cookies.set("userpageId", this.tweet.userId);
      this.$router.push("/user/" + this.tweet.userId);
    },
    toOneTweetPage() {
      this.$store.commit("tweetIdget", this.tweet.tweetId);
      cookies.set("singleTweet", this.tweet);
      this.$router.push("/tweet");
    },
    deleteTweet() {
       
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: this.token,
            tweetId: this.deleteId
          }
        })
        .then(response => {
          console.log(response.data);
          this.$emit("fakeDelete", this.index);
          this.deleteStatus = true;
        })
        .catch(errorMessage => {
          this.deleteStatus = false;
          this.errorInfo = errorMessage;
        });
    },
    commentShow() {
      this.commentDisplay = !this.commentDisplay;
      this.getComments();
    },
    getComments() {
      console.log(this.tweet.tweetId);
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          params: {
            tweetId: this.tweet.tweetId
          }
        })
        .then(response => {
          console.log(response.data);
          this.commentsNumber = response.data.length;
          this.comments = response.data;
          // console.log(this.comments)
        })
        .catch(error => {
          console.log("1212");
          console.log(error);
        });
    },
    like() {
      console.log("like");
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: this.token,
            tweetId: this.tweet.tweetId
          }
        })
        .then(response => {
          console.log(response.data);
          this.tweet.ifLike = true;
          this.tweet.likeAmount++;
        })
        .catch(error => {
          console.log("1212");
          console.log(error);
        });
    },
    unlike() {
      console.log("like");
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: this.token,
            tweetId: this.tweet.tweetId
          }
        })
        .then(response => {
          console.log(response.data);
          this.tweet.ifLike = false;
          this.tweet.likeAmount--;
        })
        .catch(error => {
          console.log("1212");
          console.log(error);
        });
    }
  },
  computed: {
    user() {
      return cookies.get("logininfo");
    },

    token() {
      return cookies.get("loginToken");
    },
    // content() {
    //   return new DOMParser().parseFromString(this.tweet.content, "text/html");
    // },
    Imgpath() {
      if (cookies.get(this.tweet.username) != undefined) {
        return cookies.get(this.tweet.username);
      } else {
        return this.$store.state.portrait[0].path;
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);

#tweet-content {
  margin-top: 1vh;
  display: grid;
  grid-template-columns: 1fr 5fr;

  > img {
    width: 10vw;
  }

  #name-date {
    z-index: 6;

    h3 {
      z-index: 6;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    }

    h6 {
      z-index: 6;
      margin-left: 70%;
    }
  }

  #tweet-text {
    width: 80%;
    margin-top: 2vh;
  }
}

#comment-like {
  display: flex;
  margin-top: 2vh;

  h5 {
    display: inline-block;
    margin-right: 5vw;

    img {
      width: 4vw;
    }
  }
}

#edit-tweet {
  width: 80%;
  min-height: 30vh;
  border-radius: 30px;
  background-color: white;
  position: fixed;
  top: 30vh;
  left: 10%;
  filter: drop-shadow(2px 2px 5px gray);
}

#deleteDiv {
  width: 80%;
  border-radius: 30px;
  background-color: white;
  position: fixed;
  top: 30vh;
  left: 10%;
  filter: drop-shadow(2px 2px 5px gray);
}

.message {
  height: 18vh;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 80%;
  margin-left: 10%;

  h2 {
    text-align: center;
  }

  span {
    height: 2vh;
    padding: 1vh;
    line-height: 2vh;
    background-color: #f2b5d4;
    border-radius: 04rem;
    font-size: 1rem;
    color: white;
  }

  #back {
    background-color: #b2f7ef;
  }
}

.calluser {
  color: red;
}

.img {
  border-radius: 50%;
}

@media only screen and (min-width: 768px) {
  #tweet-content {
    margin-top: 1vh;
    grid-template-columns: 1fr 6fr;

    > img {
      width: 6vw;
    }

    #name-date {
      z-index: 6;

      h3 {
        font-size: 1.4rem;
      }

      h6 {
        font-size: 1rem;
      }
    }

    #tweet-text {
      font-size: 1.2rem;
      margin-top: 3vh;
    }

    #comment-like {
      display: flex;
      margin-top: 2vh;

      h5 {
        display: inline-block;
        margin-right: 2vw;

        img {
          width: 3vw;
        }
      }
    }
  }

  #edit-tweet {
    width: 60%;
    left: 30%;
  }

  #deleteDiv {
    width: 50%;
    left: 30%;
  }
}

@media only screen and (min-width: 1366px) {
  #tweet-content {
    margin-top: 2vh;
    grid-template-columns: 1fr 7fr;

    > img {
      width: 4vw;
    }

    #name-date {
      z-index: 6;

      h3 {
        font-size: 1.4rem;
      }

      h6 {
        margin-left: 70%;
        font-size: 1rem;
      }
    }

    #tweet-text {
      font-size: 1.2rem;
    }

    #comment-like {
      display: flex;
      margin-top: 2vh;

      h5 {
        display: inline-block;
        margin-right: 2vw;

        img {
          width: 1.5vw;
        }
      }
    }
  }

  #edit-tweet {
    width: 40%;
    left: 25%;
  }

  #deleteDiv {
    width: 30%;
    left: 30%;
  }
}
</style>
