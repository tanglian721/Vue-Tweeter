import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/homepage.vue"
import SigninPage from "../views/SigninPage.vue"
import ProfilePage from "../views/profilepage.vue"
import UserPage from "../views/userpage.vue"
import OnetweetPage from "../views/oneTweetpage.vue"
import UserFollowpage from "../views/userfollowpage.vue"

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
    {
        path: "/profile",
        name: "profile-page",
        component: ProfilePage
    },
    {
        path: "/user/*",
        name: "user-page",
        component: UserPage
    },
    {
        path: "/tweet",
        name: "onetweet-page",
        component: OnetweetPage
    },
    {
        path: "/userfollow",
        name: "user-followpage",
        component: UserFollowpage
    },
];

const router = new VueRouter({
    routes
});

export default router;