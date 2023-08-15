<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="50%"
    v-model="addDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" style="color: white">修改信息</v-btn>
    </template>
    <v-card style="border-radius: 15px" v-if="!changePassword">
      <v-card-title>修改个人信息</v-card-title>
      <v-card-text>
        <!-- username or email in fact:debatable email rules!!!! -->
        <v-text-field
          v-model="name"
          label="name"
          :height="35"
          prepend-icon="mdi-account"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="notEmptyRules"
          label="email"
          :height="35"
          prepend-icon="mdi-email"
        ></v-text-field>

        <v-row
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2em;
            margin-bottom: 2em;
          "
        >
          <v-spacer></v-spacer>
          <v-btn text @click="cancelEdit()"
            ><v-icon class="icons">mdi-close</v-icon>取消</v-btn
          >
          <v-btn text @click="toChange()"
            ><v-icon class="icons">mdi-account-edit-outline</v-icon
            >确认修改</v-btn
          >
          <v-btn text @click="toChangePassword()"
            ><v-icon class="icons">mdi-lock-reset</v-icon>修改密码</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>
    <v-card style="border-radius: 15px" v-else>
      <v-card-title>修改密码</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="password"
          :append-icon="pwdInput ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="notEmptyRules"
          :type="pwdInput ? 'text' : 'password'"
          label="密码"
          required
          :height="35"
          @click:append="pwdInput = !pwdInput"
          prepend-icon="mdi-lock-outline"
        ></v-text-field>

        <v-text-field
          v-model="rePassword"
          :append-icon="pwdConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="pwdConfirm ? 'text' : 'password'"
          :rules="[affirmPwd]"
          label="确认密码"
          :height="35"
          required
          @click:append="pwdConfirm = !pwdConfirm"
          prepend-icon="mdi-lock-check-outline"
        ></v-text-field>
        <!-- username or email in fact:debatable email rules!!!! -->

        <v-row
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2em;
            margin-bottom: 2em;
          "
        >
          <v-spacer></v-spacer>
          <v-btn text @click="cancelChange()"
            ><v-icon class="icons">mdi-close</v-icon>取消</v-btn
          >
          <v-btn text @click="confirmChangePassword()"
            ><v-icon class="icons">mdi-check</v-icon>确认修改</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  findById,
  updateEmail,
  updatePassword,
} from "../services/user/index.js";
export default {
  name: "changeMessage",
  props: {},
  data() {
    return {
      id: null,
      email: null,
      name: null,
      changePassword: false,
      rePassword: null,
      password: null,
      notEmptyRules: [(v) => !!v || "Please fill in the required field"],
      addDialog: false,
    };
  },
  created() {
    this.getMessage();
  },
  watch: {},
  methods: {
    affirmPwd() {
      if (this.password !== this.rePassword)
        return "Two inconsistent passwords";
      return true;
    },
    getMessage() {
      const res = findById().then((res) => {
        if (res.data.status === 200) {
          this.id = res.data.data.id;
          this.email = res.data.data.email;
          this.$store.commit("SET_MAIL", this.email);
          this.name = res.data.data.name;
        } else this.$message.error(res.data.message);
      });
    },
    toChangePassword() {
      this.changePassword = true;
    },
    cancelChange() {
      this.changePassword = false;
      this.password = null;
      this.cancelEdit();
    },
    cancelEdit() {
      this.addDialog = false;
    },
    toChange() {
      const res = updateEmail(this.email).then((res) => {
        if (res.data.data.status === 200) {
          this.getMessage();
        }
      });
      this.cancelEdit();
    },
    confirmChangePassword() {
      const res = updatePassword(this.password).then((res) => {
        if (res.data.data.status === 200) {
        }
      });
      this.cancelEdit();
    },
  },
};
</script>
<style scoped>
.cardBorder {
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 18rem;
  border-radius: 1rem !important;
  width: 40%;
  min-height: 40vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 30px;
}
</style>
