import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userinfo: "",
        signUpForm: false,
        infoForm: false,
        tweetAll: [],
        createArea: false,
        homePageTweets: [],
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
        getHomePageTweets: function(state, data) {
            state.homePageTweets = data
        }
    },
    actions: {},
    modules: {}
});