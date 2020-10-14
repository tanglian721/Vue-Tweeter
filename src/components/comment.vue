<template>
  <div id="comment-area" v-if="commentDisplay">
    <img class="img" :src="Imgpath" alt="" id="userImg" />
    <div id="text-area">
      <div id="name-date">
        <h3 id="name" @click="toUserPage">{{ comment.username }}</h3>
        <h6 id="date">{{ comment.createdAt }}</h6>
      </div>
      <div v-if="editStatus == true">
        <textarea
          name=""
          id="editComment"
          cols="30"
          rows="4"
          v-model="comment.content"
        ></textarea>
        <button id="submit" @click="commentEdit">tweet</button>
      </div>
      <h4 v-else-if="editStatus == 'success'">Comment Updated Successfully</h4>
      <h4 v-else-if="editStatus == 'error'">{{ errorInfo }}</h4>
      <p v-else id="tweet-text">{{ comment.content }}</p>
      <div id="comment-like">
        <h5 id="like">
          <img
            src="../assets/heart-red.png"
            alt=""
            v-if="ifLike"
            @click="unlike"
          />
          <img src="../assets/heart.png" alt="" v-else @click="like" />
          <span id="like-active">{{ likesNumber }}</span>
        </h5>
        <h5>
          <img
            v-if="comment.username == user.username"
            id="edit"
            src="../assets/edit.png"
            alt=""
            @click="edit"
          />
        </h5>
        <h5>
          <img
            v-if="comment.username == user.username"
            id="delete"
            src="../assets/delete (1).png"
            @click="deleteShow"
          />
        </h5>
      </div>
      <div id="deleteDiv" v-if="deleteDisplay">
        <div v-if="deleteStatus == 'on'" class="message">
          <h2>Are you sure to delete this Comment?</h2>
          <span @click="backHome" id="back">Back</span>
          <span @click="deleteComment">DELETE</span>
        </div>
        <div v-else-if="deleteStatus == true" class="message">
          <h2>Comment deleted successful!</h2>
          <span id="back">Back</span>
        </div>
        <div v-else-if="deleteStatus == false" class="message">
          <h2>{{ errorInfo }}</h2>
          <span id="back">Back</span>
          <span @click="deleteComment">DELETE AGAIN</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "tweet-comment",
  props: {
    comment: {
      type: Object,
      requried: true
    }
  },
  data() {
    return {
      likesNumber: "",
      ifLike: false,
      editStatus: false,
      errorInfo: "",
      deleteId: "",
      deleteStatus: "on",
      deleteDisplay: false,
      commentDisplay: true
    };
  },
  methods: {
    toUserPage() {
      console.log(this.tweet.userId);
      this.$store.commit("DispalyUserIDget", this.tweet.userId);
      this.$router.push("/user");
    },
    getLike() {
      this.ifLike = false;
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          params: {
            commentId: this.comment.commentId
          }
        })
        .then(response => {
          this.likesNumber = response.data.length;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].username == this.user.username) {
              this.ifLike = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    edit() {
      this.editStatus = true;
    },
    commentEdit() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "patch",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.commentId,
            content: this.comment.content
          }
        })
        .then(response => {
          console.log(response);
          this.editStatus = "success";
          setTimeout(() => {
            this.editStatus = false;
          }, 1000);
        })
        .catch(errorMessage => {
          this.errorInfo = errorMessage;
          this.editStatus = "error";
          setTimeout(() => {
            this.editStatus = false;
          }, 1000);
        });
    },
    deleteShow() {
      this.deleteDisplay = true;
    },
    deleteComment() {
      console.log("delete");
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.commentId
          }
        })
        .then(() => {
          console.log();
          setTimeout(() => {
            this.deleteDisplay = false;
            location.reload();
          }, 1000);
        })
        .catch(errorMessage => {
          console.log(errorMessage);
          this.deleteStatus = false;
          this.errorInfo = errorMessage;
          setTimeout(() => {
            this.deleteDisplay = false;
          }, 1000);
        });
    },
    backHome() {
      this.deleteDisplay = false;
    },
    test() {
      console.log(this.user);
    },
    like() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.commentId
          }
        })
        .then(response => {
          console.log(response.data);
          this.getLike();
        })
        .catch(error => {
          console.log(error);
        });
    },
    unlike() {
      console.log("unlike");
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
          },
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.commentId
          }
        })
        .then(response => {
          console.log(response.data);
          this.getLike();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getLike();
  },
  computed: {
    user() {
      return cookies.get("logininfo");
    },
    Imgpath() {
      if (cookies.get(this.comment.username) != undefined) {
        return cookies.get(this.comment.username);
      } else {
        return this.$store.state.portrait[0].path;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#comment-area {
  // min-height: 84vh;
  margin-top: 2vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr;

  > img {
    width: 8vw;
  }

  #text-area {
    width: 90%;

    #name-date {
      z-index: 6;

      h3 {
        z-index: 6;
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
      }

      h6 {
        z-index: 6;
        margin-left: 60%;
      }
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
}

#submit {
  background-color: #b2f7ef;
  border: none;
  color: white;
  padding: 0.4rem;
  border-radius: 04rem;
  margin-left: 70%;
  margin-top: 1vh;
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
    padding: 2vw;
    line-height: 2vh;
    background-color: #f2b5d4;
    border-radius: 04rem;
    font-size: 1rem;
    color: white;
  }
}

.img {
  justify-self: center;
  border-radius: 50%;
}

@media only screen and (min-width: 768px) {
  #comment-area {
    .img {
      width: 5vw;
    }

    #editComment {
      font-size: 1.2rem;
    }

    #comment-like {
      h5 {
        img {
          width: 2.5vw;
        }
      }
    }
  }
}

@media only screen and (min-width: 1366px) {
  #comment-area {
    .img {
      width: 3vw;
    }

    #editComment {
      font-size: 1.2rem;
    }

    #comment-like {
      h5 {
        margin-right: 2vw;

        img {
          width: 1.5vw;
        }
      }
    }
  }
}
</style>
