<template>
  <!-- aaa -->
  <div id="main">
    <sideBar></sideBar>
  </div>
</template>

<script>
import sideBar from "../../components/sideBar.vue";
export default {
  name: "HomePage",
  components: {
    sideBar,
    // defaultAccountSubPage,
  },
  created() {},
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.flexLike {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
