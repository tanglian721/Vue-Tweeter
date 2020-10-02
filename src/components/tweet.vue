<template>
    <div>
        <div id="tweet-content">
            <img src="../assets/user (2).png" alt="" id="userImg">
            <div id="text-area">
                <div id="name-date">
                    <h3 id="name">{{ tweet.username }}</h3> 
                    <h6 id="date">{{ tweet.created_at }}</h6>
                </div>
                <p id="tweet-text">{{ tweet.content }}</p>
                <div id="comment-like">
                    <h5 id="comment">
                        <img src="../assets/speech.png" alt="">
                        <span id="comment-number">3</span>
                    </h5>
                    <h5 id="like">
                        <img src="../assets/heart.png" alt="">
                        <span id="like-active">4</span>
                    </h5>
                    <h5>
                       <img id="edit" src="../assets/edit.png" alt="">
                    </h5>
                </div>
                <div id="comment-area">
                    <div id="comment-splitter"></div>
                    <tweet-comment></tweet-comment>
                </div>
            </div>
        </div>
        <div id="splitter"></div>
    </div>
</template>

<script>
    import TweetComment from "./comment.vue"
    export default {
        name:"single-tweet",
        components:{
            TweetComment
        },
         props:{
            tweet:{
               type:Object,
               requried: true
            }
        },
    }
</script>

<style lang="scss" scoped>
#tweet-content{
    margin-top: 2vh;
    display: grid;
    grid-template-columns: 1fr 5fr;
    >img{
        width: 10vw;
    }
    #name-date{
        position: relative;
           h3{
               border-bottom:1px solid rgba($color: #000000, $alpha: 0.2);
           }
           h6{
              position: absolute;
              right: 1vw;
           }
    }
    #tweet-text{
        margin-top: 2vh;
    }
    #comment-like{
        display: flex;
        margin-top: 2vh;
        h5{
            display: inline-block;
            margin-right: 5vw;
            img{
                width: 4vw;
            }
        }
    }
   
    

}
    // #splitter{
    //     margin-top: 2vh;
    //     height: 1px;
    //     width: 100%;
    //     background-color:rgba($color: #000000, $alpha: 0.2);
    // }

</style>