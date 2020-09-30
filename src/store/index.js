import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: "",
        signUpForm: false,
    },
    mutations: {
        signUpDisplay: function(state) {
            state.signUpForm = !state.signUpForm
        }
    },
    actions: {},
    modules: {}
});