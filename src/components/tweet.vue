<template>
    <div>
        <div id="tweet-content">
            <img src="../assets/user (2).png" alt="" id="userImg">
            <div id="text-area">
                <div id="name-date">
                    <h3 id="name">taylor</h3>
                    <h3 id="date">2020-9-21</h3>
                </div>
                <p id="tweet-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sed facere quidem, voluptate, voluptatum obcaecati optio rem cupiditate aliquam sit necessitatibus voluptatibus. Facilis maiores quas fuga reiciendis nam laudantium autem.</p>
                <div id="comment-like">
                    <h5 id="comment">
                        <img src="../assets/speech.png" alt="">
                        <span id="comment-number">3</span>
                    </h5>
                    <h5 id="like">
                        <img src="../assets/heart.png" alt="">
                        <span id="like-active">4</span>
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
        }
    }
</script>

<style lang="scss" scoped>
#tweet-content{
    display: grid;
    grid-template-columns: 1fr 5fr;
    >img{
        width: 10vw;
    }
    #name-date{
        display: flex;
        justify-content: space-between;
        h3{
        display: inline-block;
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
    

    #splitter{
        height: 2px;
        width: 99vw;
        margin-left: -10%;
        background-color:rgba($color: #000000, $alpha: 0.2);
    }
}

</style>