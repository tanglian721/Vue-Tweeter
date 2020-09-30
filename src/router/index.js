import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/homepage.vue"
import SigninPage from "../views/SigninPage.vue"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "landing-page",
        component: LandingPage
    },
    {
        path: "/signin",
        name: "signin-page",
        component: SigninPage
    },


];

const router = new VueRouter({
    routes
});

export default router;