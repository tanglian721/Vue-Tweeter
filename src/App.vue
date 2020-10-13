<template>
  <div id="app">
    
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    test11() {
      console.log("aa")
      
    }
  },
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.calluser{
            color: red;
        }
.hash{
  color: coral;
}
.desktop, .tablet{
  display: none;
}
@media only screen and (min-width:760px){
  .moblie{
    display: none;
  }
  .tablet{
    display: block;
  }
  .tabletHide{
    display: none;
  }
}
@media only screen and (min-width:1366px) {
  .desktop{
   display: block;
}
.tabletHide{
    display: inline-block;
  }
 .desktopHide{
   display: none;
 }
}
</style>
