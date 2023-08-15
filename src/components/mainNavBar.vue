<template>
  <v-app-bar id="barA" style="display: block" app color="rgba(133,214,215,1)">
    <v-avatar id="logo" tile><img src="../static/tomato.png" /></v-avatar>
    <v-avatar id="logo" tile><img src="../static/tomato.png" /></v-avatar>
    <v-avatar id="logo" tile><img src="../static/tomato.png" /></v-avatar>
    <img src="../static/title.png" id="title" />
    <v-avatar id="logo" tile><img src="../static/tomato.png" /></v-avatar>
    <v-avatar id="logo" tile><img src="../static/tomato.png" /></v-avatar>
    <v-avatar id="logo" tile><img src="../static/tomato.png" /></v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  name: "mainNavBar",
  props: {},
  data: () => {
    return {};
  },
  created() {},
  updated() {},
  methods: {},
  watch: {},
  //计算属性
  computed: {
    getName() {
      return this.$store.state.loginName;
    },
    getLog() {
      return !this.$store.getters.isLoggedIn;
    },
  },
};
</script>
<style scoped>
main-nav-bar {
  position: fixed;
}

#logo {
  text-align: center;
  margin-left: 2rem;
  margin-right: 2rem;
}

#barA {
  min-height: 5rem;
  text-align: center;
}
/* 
@font-face {
  font-family: Luna;
  src: url(../static/font/Luna.ttf);
} */
#title {
  height: 150%;
  width: 40%;
  margin: auto;
}
</style>
