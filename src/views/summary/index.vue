<template>
  <div class="main">
    <div class="flexSet">
      <sideBar class="left"></sideBar>
      <div class="rightContent">
        <div>
          <summaryCard></summaryCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sideBar from "../../components/sideBar.vue";
import summaryCard from "./components/summaryCard.vue";
export default {
  name: "Summary",
  components: {
    sideBar,
    summaryCard,
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
