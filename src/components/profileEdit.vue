<template>
    <div id="profile-show">
        <img id="userImg" :src= Imgpath alt="">
        <span id="editBtn" @click="edit = !edit"> Edit Profile </span>
        <div id="userInfo">
            <p id="user">
                Username: 
                <input v-if="edit" type="text" v-model="user">
                <span v-else>{{  user  }}</span>
                </p>
            <p id="email">
                Email: 
                <input v-if="edit" type="text" v-model="email">
                <span v-else>{{  email  }}</span>
                </p>
            <p id="birthday">
                 Birthday:
                <input v-if="edit" type="text" v-model="birthday">
                <span v-else>{{  birthday  }}</span>
                </p>
            <p id="bio">
                 Bio: 
                 <input v-if="edit" type="text" v-model="bio">
                <span v-else>{{  bio  }}</span>
                </p>
            <p id="follow">
               <span id="following">following : 2</span>
               <span id="follower"> follower :4</span>
            </p>
            <portrait-set  v-if="edit" id="portrait-set"></portrait-set>
        </div>
        <span id="submit" v-if="edit" @click="signUpUser">Submit</span>
    </div>
</template>

<script>
import PortraitSet from "../components/portraitSet"
import cookies from "vue-cookies"
import signUpApi from "axios"

    export default {
        name:"profile-edit",
        components:{
            PortraitSet
        },
        data() {
            return {
                user: "name",
                email:"email",
                birthday: "birthday",
                bio: "bio",
                edit: false,
            }
        },
        methods: {           
            loading(){
                this.user = this.userinfo.username,
                this.email = this.userinfo.email,
                this.birthday = this.userinfo.birthdate,
                this.bio = this.userinfo.bio
                console.log("1")
                console.log(this.userinfo)
            },
            signUpUser() {
                signUpApi.request({
                  url:"https://tweeterest.ml/api/users",
                  method:"patch",
                  headers:{
                    "Content-Type":"application/json",
                    "X-Api-Key":"57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT"
                  },
                  data:{
                    "loginToken": this.token,
                    "email":this.email,
                    "username":this.username,
                    "password":this.password,
                    "birthdate":this.birthdate,
                    "bio":this.bio
                  }
                }).then((response)=>{
                    console.log(response.data)
                    cookies.set("logininfo",response.data)
                    this.edit = false;
                    location.reload();
                }).catch((error)=>{
                    console.log(error)
                })
                
            }
        },
         computed: {
            userinfo() {
                return cookies.get("logininfo")
            },
            token() {
                return cookies.get("loginToken")
            }, 
            Imgpath() { if(cookies.get(cookies.get("logininfo").username)!= undefined){
                return cookies.get(cookies.get("logininfo").username) 
            } else {
                return this.$store.state.portrait[0].path
            }
            }
        },
         mounted () {
            this.loading();
        }
    }
</script>

<style lang="scss" scoped>
    #profile-show{
        position: relative;
        #userImg{
            width: 25vw;
            position: relative;
            top: -13vw;
            left: 5vw;
            border-radius: 50%;
        }
        #editBtn{
            border: 1px solid black;
            border-radius: 1rem;
            padding: 3px;
            position: absolute;
            top: 1vh;
            right:5vw;
        }
        #userInfo{
            position: relative;
            left: 10vw;
            p{
              font-size: 1.2rem;
              margin-bottom: 2vh;
            }
        }
        #submit{
            position: relative;
            background-color: #B2F7EF;
            border: none;
            color: white;
            padding: 0.4rem;
            border-radius: 04rem;
            margin-left:10vw;
            top: 4vh;
            filter: drop-shadow(2px 2px 5px gray);
        }
        #portrait-set{
            width: 70vw;

        }
    }

</style>