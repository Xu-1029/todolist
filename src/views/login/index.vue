<template>
  <div id="loginPage">
    <loginCard></loginCard>
  </div>
</template>
<script>
import loginCard from "./components/loginCard.vue";
export default {
  name: "login",
  components: {
    loginCard,
  },
};
</script>
<style scoped>
#loginPage {
  background-image: url(../../static/card_bg.png);
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>
