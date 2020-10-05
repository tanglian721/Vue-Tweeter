import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies";
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        signUpForm: false,
        infoForm: false,
        createArea: false,
        oneUserTweet: [],
        homePageTweets: [],
        allTweets: [],
        followTweets: [],
        // DisplayUserID: "",
        tweetId: "",
        singleTweet: "",
        following: "",
        follower: ""
    },
    mutations: {
        signUpDisplay: function(state) {
            state.signUpForm = !state.signUpForm;
        },
        infoShow: function(state) {
            state.infoForm = true;
        },
        infoHide: function(state) {
            state.infoForm = false;
        },
        createShow: function(state) {
            state.createArea = true;
        },
        createHide: function(state) {
            state.createArea = false;
        },
        userFollowing: function(state, array) {
            state.following = array;
        },
        userFollower: function(state, array) {
            state.follower = array;
        },
        // DispalyUserIDget(state, id) {
        //     state.DisplayUserID = id
        // },
        tweetIdget(state, id) {
            state.tweetId = id;
        },
        getHomeTweets: function(state, data) {
            state.homePageTweets = data;
        },
        getOneUserTweets: function(state, data) {
            state.oneUserTweet = data;
        },
        pushAllTweet(state, tweet) {
            state.allTweets.push(tweet);
            console.log(state.allTweets)
        },
        pushFollowTweet(state, tweet) {
            state.followTweets.push(tweet);
            console.log(state.followTweets)
        }
    },
    actions: {
        alltweetGet(context) {
            axios.request({
                url: "https://tweeterest.ml/api/tweets",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                }
            }).then((response) => {
                context.commit("getHomeTweets", response.data);
            }).catch((error) => {
                console.log("1212")
                console.log(error)
            })
        },
        SingleTweetGet(context) {
            axios.request({
                url: "https://tweeterest.ml/api/tweets",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                },
                params: {
                    "userId": cookies.get("userpageId")
                }
            }).then((response) => {
                console.log(response)
                context.commit("getOneUserTweets", response.data)
            }).catch((error) => {
                console.log(error)
            })
        }

    },
    modules: {},
    getters: {
        tweetAllByDate: function(state) {
            function compare(a, b) {
                let tweetA = a.created_at;
                let tweetB = b.created_at;
                let comparision = 0;
                if (tweetA < tweetB) {
                    comparision = 1;
                } else if (tweetA > tweetB) {
                    comparision = -1;
                }
                return comparision
            }
            return state.allTweets.sort(compare);
        },
        tweetAllByLike: function(state) {
            function compare(a, b) {
                let tweetA = a.likeAmount;
                let tweetB = b.likeAmount;
                let comparision = 0;
                if (tweetA < tweetB) {
                    comparision = 1;
                } else if (tweetA > tweetB) {
                    comparision = -1;
                }
                return comparision
            }
            return state.allTweets.sort(compare);
        },
        tweetAllByComments: function(state) {
            function compare(a, b) {
                let tweetA = a.commentstAmount;
                let tweetB = b.commentstAmount;
                let comparision = 0;
                if (tweetA < tweetB) {
                    comparision = 1;
                } else if (tweetA > tweetB) {
                    comparision = -1;
                }
                return comparision
            }
            return state.allTweets.sort(compare);
        },
        userFollowTweetByDate: function(state) {
            function compare(a, b) {
                let tweetA = a.created_at;
                let tweetB = b.created_at;
                let comparision = 0;
                if (tweetA < tweetB) {
                    comparision = 1;
                } else if (tweetA > tweetB) {
                    comparision = -1;
                }
                return comparision
            }
            return state.followTweets.sort(compare);
        },

    }
});