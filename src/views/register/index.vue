<template>
  <div id="registerPage">
    <registerCard></registerCard>
  </div>
</template>
<script>
import registerCard from "./components/RegisterCard";
export default {
  name: "register",
  components: {
    registerCard,
  },
};
</script>
<style scoped>
#registerPage {
  background-image: url(../../static/card_bg.png);
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>
