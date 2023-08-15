<template>
  <div class="main">
    <div class="flexSet">
      <sideBar class="left"></sideBar>
      <div class="rightContent">
        <div>
          <planCard></planCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sideBar from "../../components/sideBar.vue";
import planCard from "./components/plan";
export default {
  name: "Plan",
  components: {
    sideBar,
    planCard,
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  margin: 0 0;
}

.flexSet {
  display: flex;
}

.left {
  min-width: 3rem;
  width: calc(10%);
  flex-shrink: 1;
}

.rightContent {
  flex-basis: calc(92%);
  flex-shrink: 3;
  flex-grow: 35;
}
</style>
