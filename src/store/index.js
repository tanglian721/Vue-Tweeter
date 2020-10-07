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
        following: [],
        follower: [],
        portrait: [{
                id: 0,
                path: "https://lh3.googleusercontent.com/proxy/9XZYVuKFypmvgMtHjyGgSxv_zZt8SIELb0nn--fBs5PujupfZRt7KkfdXATjENtj8YNxQNLwC4VJBRb8Q7VJq4MWtYQwnjk3EWaeK2MD544vf1o"
            }, {
                id: 1,
                path: "https://pbs.twimg.com/profile_images/1278183948279922690/ybnDHXn7_400x400.jpg"
            }, {
                id: 2,
                path: "https://pbs.twimg.com/profile_images/1277861176727257090/hVmaujAQ_400x400.jpg"
            }, {
                id: 3,
                path: "https://pbs.twimg.com/profile_images/1309477596598431744/Jrcoh81s_400x400.png"
            },
            {
                id: 4,
                path: "https://pbs.twimg.com/profile_images/1313580069323898880/9cCQ0Ut6_400x400.jpg"
            },
            {
                id: 5,
                path: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-cook-medium-skin-tone.png"
            },
        ]
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
        clearAllTweet(state) {
            state.allTweets = [];
        },
        clearFollowTweet(state) {
            state.followTweets = [];
        },
        pushAllTweet(state, tweet) {
            state.allTweets.push(tweet);
        },
        pushFollowTweet(state, tweet) {
            state.followTweets.push(tweet);
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
                let tweetA = a.createdAt;
                let tweetB = b.createdAt;
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
                let tweetA = a.createdAt;
                let tweetB = b.createdAt;
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
        userFollowTweetAllByComments: function(state) {
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
            return state.followTweets.sort(compare);
        },
    }
});