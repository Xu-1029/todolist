<template>
  <v-app>
    <v-main id="to">
      <mainNavBar></mainNavBar>
      <router-view v-if="isRouterAlive"></router-view>
    </v-main>
    <Message />
  </v-app>
</template>

<script>
import mainNavBar from "./components/mainNavBar.vue";
import Message from "./components/alert.vue";
import sideBar from "./components/sideBar.vue";
export default {
  name: "App",
  components: {
    Message,
    mainNavBar,
    sideBar,
  },
  created() {},
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style>
#to {
  width: 100%;
  height: 100%;
  display: flex;
  background: #dff0de;
}
</style>
