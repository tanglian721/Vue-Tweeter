import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: "",
        signUpForm: false,
        infoForm: false,
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
        }
    },
    actions: {},
    modules: {}
});