import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/homepage.vue"
import SigninPage from "../views/SigninPage.vue"
import ProfilePage from "../views/profilepage.vue"
import UserPage from "../views/userpage.vue"
import UserFollowpage from "../views/userfollowpage.vue"
import CalledTweetpage from "../views/calledTweetpage.vue"
import SingleTopic from "../views/SingleTopicpage.vue"

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
        path: "/topic/*",
        name: "single-topic",
        component: SingleTopic
    },
    {
        path: "/userfollow",
        name: "user-followpage",
        component: UserFollowpage
    },
    {
        path: "/calledpage",
        name: "called-tweetpage",
        component: CalledTweetpage
    },

];

const router = new VueRouter({
    routes
});

export default router;