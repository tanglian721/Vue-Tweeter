import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies";
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userinfo: "",
        signUpForm: false,
        infoForm: false,
        tweetAll: [],
        createArea: false,
        homePageTweets: [],
        DisplayUserID: "",
        tweetId: ""
    },
    mutations: {
        signUpDisplay: function(state) {
            state.signUpForm = !state.signUpForm
        },
        infoShow: function(state) {
            state.infoForm = true
        },
        infoHide: function(state) {
            state.infoForm = false
        },
        createShow: function(state) {
            state.createArea = true
        },
        createHide: function(state) {
            state.createArea = false
        },
        userinfo: function(state) {
            if (cookies.get("logininfo") != undefined) {
                state.userinfo = cookies.get("logininfo")
            }
        },
        DispalyUserIDget(state, id) {
            state.DisplayUserID = id
        },
        tweetIdget(state, id) {
            state.tweetId = id
        },
        getHomeTweets: function(state, data) {
            console.log(data)
            state.homePageTweets = data
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
                context.commit("getHomeTweets", response.data)
            }).catch((error) => {
                console.log("1212")
                console.log(error)
            })
        },
        SingleTweetGet(context) {
            console.log("hello")
            console.log(this.state.DisplayUserID)
            axios.request({
                url: "https://tweeterest.ml/api/tweets",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                },
                data: {
                    "userId": this.state.DisplayUserID
                }
            }).then((response) => {
                console.log(response)
                context.commit("getHomeTweets", response.data)
            }).catch((error) => {
                console.log("1212")
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
                if (tweetA > tweetB) {
                    comparision = 1;
                } else if (tweetA < tweetB) {
                    comparision = -1;
                }
                return comparision
            }
            return state.homePageTweets.sort(compare);
        }
    }
});