import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies"

// import axios from "axios"

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
        TrendingDisplay: false,
        tweetId: "",
        singleTweet: "",
        following: [],
        follower: [],
        calledTweet: [],
        topicArray: [],
        topicdisplay: false,
        portrait: [{
                id: 0,
                path: "https://lh3.googleusercontent.com/ae_hkmR-pHPKzKEPAASoX43w1nDjYnXkEl0wspuSLnXa6c0uvvDWHDiqae_bO45KVK1l1AlYgv3wuSVRSbjZ326R9su31EIeX_TvjlJXxYfRTW3t47Mo-YiyvYoLUYIgt9IlQseD-8y9bgBmCccg_iCjpgWLwANjWFcCJbB_Iaust1CC6nyxjaYIvzDpMzRTAB9TptWdYJ8OxjBNG1vjsA4H0fN_tLNLTrjiFM2SAaljclEQX3LUsk7onpRORCZ-SEkgNJT-pGP3UWj7-kkJFvpCL2rcwdudu4E8Le906O2Jo7-o6NcamsetD7t_zu8aPWcrxWR-gxAwsU161wgk-Qju2GGHqxHL-A1MmC8MfD3zGj0Gyij_vt72Wc2gV-4tCG98n7A6VKIIyGbR5bw_X14HFoomlouVar69glAuAZacN75p5TQyA_5TVN7gXAVaNWr_sNNgLJRyUsCGUubIZsdDxXW3fHul7FCaKmZ8VyU_BTTi7mfBJZFyN6z173xvd_-mOz7S24rhwSGH_AvCch-4SuqrlHbU2gKHuaOqOp0hPZSrjxjlkA8qcL2gMTypOXtcgVgorayltYg3D3kPwzhDcNpN1do-GWj1-Ka1qt0V_vQkFxBMYWPoCzjBC0UEuuLAVS1Yjeio3gpyW1HJdL_-W_hi83F-EjXESlR2UrN_nSSgqdAxxj5En7s=w459-h435-no?authuser=1"
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
            {
                id: 6,
                path: "https://lh3.googleusercontent.com/proxy/4W_uFZCVbKx-PvpXbigIWZOWQH9x2xPh-w2OzdW4EZqUlNHLwJvgV9n2HW3HTs0oS_aQF9-vhsMY4z-0PXmFS_trxbQ1oTEt5gRrVY8tyf8N9WwvudV6PY0AK3e__Si3pkWovPhP-ZUiI4de1K8dymMSLjcNgEgQ7ewKMlAZAkcK0XHwSNFmzp5kprsPfQIlb-ZPe20"
            },
            {
                id: 7,
                path: "https://p1.hiclipart.com/preview/490/295/804/tomb-raider-game-icon-tomb-raider-3-tomb-raider-portrait-painting-png-clipart.jpg"
            },
            {
                id: 8,
                path: "https://pngwebicons.com/uploads/anime/ico/anime_icon6680.ico"
            },
            {
                id: 9,
                path: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgUHmCjkjgVK-W1KYzItygzUyGYMyaVnT1eg&usqp=CAU"
            },
            {
                id: 10,
                path: "https://iconarchive.com/download/i76672/xenatt/the-circle/App-Messages.ico"
            },
            {
                id: 11,
                path: "https://www.freeiconspng.com/uploads/sms-icon-16.png"
            },
            {
                id: 12,
                path: "https://bitrise-steplib-collection.s3.amazonaws.com/steps/twitter-message/assets/icon.svg"
            },
            {
                id: 13,
                path: "https://lh3.googleusercontent.com/Nysg2UTeMoEK88uwGI3GIp8Idt3VEbwyJSRSgEqAkW258lLlVdWP6GZW6w5m5X67Nm_fxDzB5iN-7mork2kknCpeM1cZD-m5YuaOycmjKgAxHZe45s2kYYJIwGTveULl2G3dR4TQTCJL-avkEQf-O2_qsvv0e0-qwTKcQrnuNWWy_H_kMqcDa_ab-LjvLQppnus-yMXjX1X31YBTEZ5t2KPoaHBYNJPhuhDaYoUX2rMi0jV-3pUG1PsAWw-sDMeolB5OgjKmBPpiHm0UUDdqNMhC60-FYg0EUnU77YLrokz9TUWSItqTBF_nlyhuGxilI-d_bnlnjzRSCHsERTRy-rp__AQm_LN1rH1td2HfP9BeUZOmuzHtc7uewvuqhob7xNFMB29BhHtbvJ3b4oWXC0dc7iGGkNBWXjU5U-PFlLfjmkKc4uKoYptrbxCbU19b6SuijYQk0CZQ3Gu9q7a8pQCq31iE3_PdXgQqew0xG9Ff4hVIIkNiuQDbv-ocV4P_H1QUhaA-38LYNiUSqSjaBAn0iKPxHf8QsxdUz2KpG8fJbugWqqGkU2L5CAwcP0xO818iKXHBwS2qEMFEVYy-8nFWw6UCpnIqz1dlsGtdo92Zd_dZD2rK7fo1LXI3mpSQQCiUzAtrvkGqbZrru3x8lm72-w9gCI4LJqWNJNOOWtn8ngAhgE5e5PNMORo=s256-no?authuser=1"
            },
            {
                id: 14,
                path: "https://lh3.googleusercontent.com/jKnHuFv4QCqdbTPd4lvUYIf7jzwyf9vDzEbVSvqZW7xdXjBMO8NefpybvPG-QoUcVY_1AW5wsTkI3FQtWW3Q4g9yHo0GnxCVMwdn7Gd65zHLCKejottXookiBQk0c6AqrijM7HwT8P5MrZP6DsTwA9bMN3-pxC9JQYz-wXBNwWE4hBJgFN9IW0nlf9Zi7bpPaGSi3DkygcQXNHkFFO6uv2aKK8biqNcdP5BlmzhhqmVevE1gOGJQ9yyoEJ0N_9X30p73GsLnI0A2aulVBhdABeZmgzm0jJ8weBhD4vAP9NuE1hE--ofhKtFjgNc5fvsKsxwd_xPfKEGKJQfKjvNsOwnH3maHvWa0WR08kJQZJufl_viZF20SLbL-7KkbrhJOZFWTJ-NlG6NRYqeO0FvAmlsndADjayaETOAoYGVBqRcykgDcCn0c_w079lLCQuSOaZBG6Lfnq5GFP7ZinPj6BQl3vwpG-_O8tP3sDHvmM7rmknhB8BrC6SaePsNoREUTp76qZ9GQAlWqJnhLy1PI-q0PWB3WXnRfNw0b8Ut9J9JDs2hneCHiNIHTf_rFNosbeZUgxkeZkz7cE-MboGuSqoGiENe16xhl-cBcfJuBPNgCmfbNJhN3UGk3eMZ9CBD5EDe4DfJTtWag30h9lpWWF7yLk6_umzYTOpOKiOkFWpYVUjIe6rrugTb1b28=s256-no?authuser=1"
            },
            {
                id: 15,
                path: "https://lh3.googleusercontent.com/GsWrp-R5-XQfsoJV1A36WqdMgMSmnnBfTCwR6uhpdkea-na5EWov3Bj21gkZluxJX0dMnZFiXYlg0HHQGhqP249DSW09VzL8mkpIfSeBpT_41sU0KIIzMUY-wSF0SlX3ZwrjURnA7VDQLkrbdXtnL33tnHqE_xcAjvHRPujUzFYMfM1qY5s6q3UY-n4wmXFnAVc9jaotmbw3zmodDA3-mddfNgJK_PMM6lIeyY9vML_9lZ94gpLmZyakFR1VpFRwUROgN93MUjvsAFA4vpqCxN839YXAKxcqMbrz5StzqvZ29qz1wJWW5rgpuiEwdtOUcAbbxfFLjbFfa82QX4xOkFmEwRlc1y_gYIkLYFV0gcnJVjkZVxRh9GRnco9kOYcD1uzKm_nkAlZLrg0xvrIkURNGipNCdmoF48eLyWBZ768AV7wNFri_GIWKA-EE2C0uvXncLIzQq6DPFVuapf-xTqatN_blF1CoVxobz-PFiuXNllPiemk6-3r2rMtsqwe9psOnT15liDExUjtkUYoL2PZO2WarJhJnhtXandqvVjIvWOSK_OwU9KPeowEwLFzLZvZs2Z4WzdlcGzn3RUKf5gZzmEOCWaTeMWXNIKVmY6VCTLP82KszPJtYVD_aUuPumqh4wkG0d_GE-jZinfAj0Gwk0w4-A_e5NUYwAjSsM13LKalh5MM6pWsfpAc=s256-no?authuser=1"
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
        topicShow: function(state) {
            state.topicdisplay = true;
        },
        topicHide: function(state) {
            state.topicdisplay = false;
        },
        userFollowing: function(state, array) {
            state.following = array;
        },
        userFollower: function(state, array) {
            state.follower = array;
        },
        switchTrending(state) {
            state.TrendingDisplay = !state.TrendingDisplay
        },
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
            state.calledTweet = [];
        },
        clearFollowTweet(state) {
            state.followTweets = [];
        },
        pushAllTweet(state, tweet) {
            state.allTweets.push(tweet);
        },
        pushFollowTweet(state, tweet) {
            state.followTweets.push(tweet);
        },


    },
    actions: {},
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
            state.topicArray = state.allTweets.sort(compare)
            return state.topicArray;
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
        userFollowTweetAllBylikes: function(state) {
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
            return state.followTweets.sort(compare);
        },
        noticeTweet(state) {
            let user = "@" + cookies.get("logininfo").username;
            for (let i = 0; i < state.allTweets.length; i++) {
                if (state.allTweets[i].content.includes(user) == true && state.calledTweet.includes(state.allTweets[i]) == false) {
                    state.calledTweet.push(state.allTweets[i])
                }
            }
            return state.calledTweet
        }
    }
});