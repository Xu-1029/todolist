<template>
  <v-navigation-drawer
    permanent
    expand-on-hover
    rail
    color="rgba(56,94,107,120)"
    class="side"
  >
    <v-list two-line class="listBar">
      <!-- 登录后 -->
      <v-list-item v-if="!getLog" link class="px-2">
        <v-avatar class="icons">
          <img src="../static/tomato.png" />
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6" v-html="name"></v-list-item-title>
          <v-list-item-subtitle v-html="email"></v-list-item-subtitle>
          <!-- <changeMessage></changeMessage> -->
        </v-list-item-content>
      </v-list-item>

      <!-- 未登录 -->
      <v-list-item v-else @click="goPage('/login')" link class="px-2">
        <v-avatar class="icons">
          <img src="../static/user_icon.png" />
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> 登录 </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider inset></v-divider>
    <v-list nav dense>
      <v-list-item-group color="rgb(247,253,226)">
        <template>
          <v-list-item @click="goPage('/summary')" link>
            <v-list-item-icon class="icons">
              <img src="../static/summary_icon.png" alt="" />
            </v-list-item-icon>
            <v-list-item-title>概览</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goPage('/plan')" link>
            <v-list-item-icon class="icons">
              <img src="../static/plan_icon.png" alt="" />
            </v-list-item-icon>
            <v-list-item-title>复习</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goPage('/todo')" link>
            <v-list-item-icon class="icons">
              <img src="../static/todo_icon.png" alt="" />
            </v-list-item-icon>
            <v-list-item-title>待办</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!getLog" @click="logout()" link>
            <v-list-item-icon class="icons">
              <img src="../static/user_icon.png" />
            </v-list-item-icon>
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import changeMessage from "./changeMessage.vue";
export default {
  name: "sideBar",
  components: {
    changeMessage,
  },
  data() {
    return {
      email: this.$store.state.email,
      name: this.$store.state.loginName,
    };
  },
  computed: {
    getLog() {
      return !this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    goPage(page) {
      this.$router.push(page);
    },
    logout() {
      this.$store.commit("REMOVE_STATE");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.side {
  flex-shrink: 1;
  flex-grow: 1;
  min-height: 900px;
  width: 70px;
}
.icons {
  margin: auto;
  width: 30%;
  height: 30%;
}
.listBar {
  margin-top: 2rem;
}
.side
  .theme--light.v-list-item:not(.v-list-item--active):not(
    .v-list-item--disabled
  ) {
  color: white;
}
.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 2rem;
}
.theme--light.v-navigation-drawer .v-divider {
  border-color: rgba(255, 255, 255, 0.8);
}
.v-list-item__title {
  font-family: "Microsoft YaHei";
}
</style>
