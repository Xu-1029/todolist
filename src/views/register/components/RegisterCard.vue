<template>
  <v-card class="cardBorder" justify="center">
    <v-form v-model="valid" style="width: 100%">
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <v-text-field
            v-model="loginName"
            :rules="notEmptyRules"
            label="用户名"
            required
            prepend-icon="mdi-account-outline"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="邮箱"
            required
            prepend-icon="mdi-email-outline"
          >
            <template v-slot:append-outer>
              <v-btn
                class="button"
                text
                color="primary"
                @click="register()"
                :disabled="loginName == '' || email == '' || canClick == false"
                >{{ content }}</v-btn
              >
            </template></v-text-field
          >

          <v-text-field
            v-model="password"
            :append-icon="pwdInput ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="pwdInput ? 'text' : 'password'"
            label="密码"
            required
            @click:append="pwdInput = !pwdInput"
            prepend-icon="mdi-lock-outline"
          ></v-text-field>

          <v-text-field
            v-model="rePassword"
            :append-icon="pwdConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pwdConfirm ? 'text' : 'password'"
            :rules="[affirmPwd]"
            label="确认密码"
            required
            @click:append="pwdConfirm = !pwdConfirm"
            prepend-icon="mdi-lock-check-outline"
          ></v-text-field>

          <v-text-field
            v-model="checkCode"
            :rules="notEmptyRules"
            label="验证码"
            required
            prepend-icon="mdi-email-check-outline"
          >
          </v-text-field>

          <v-btn
            :disabled="!valid"
            color="rgb(133,214,215)"
            elevation="1"
            class="loginButton"
            @click="registerConfirm()"
            height="45px"
            block
            style="font-size: 1.2rem; color: white"
            >SIGN UP NOW
          </v-btn>

          <v-row
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 2em;
              padding: 0 10%;
            "
          >
            <v-btn text @click="toLogin()" style="min-width: 45%"
              ><v-icon class="icons">mdi-account-outline</v-icon>Switch To
              Login</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn text @click="clearRegister()" style="min-width: 45%"
              ><v-icon class="icons">mdi-close</v-icon>Cancel</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { registerUser, registerConfirm } from "../../../services/umps/index.js";
export default {
  name: "registerCard",
  data: () => {
    return {
      //side
      loginName: "",
      email: "",
      password: "",
      canClick: true,
      checkCode: "",
      pwdInput: false,
      rePassword: "",
      pwdConfirm: false,
      notEmptyRules: [(v) => !!v || "Please fill in the required field"],
      passwordRules: [(v) => !!v || "Please fill in the required field"],
      // the link of codePic
      valid: false,
      emailRules: [
        (v) => !!v || "Please fill in the required field",
        (v) => /.+@.+\..+/.test(v) || "Mailbox illegal",
      ],

      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
    };
  },
  methods: {
    //make sure the two pwd inputs stay the same
    affirmPwd() {
      if (this.password !== this.rePassword)
        return "Two inconsistent passwords";
      return true;
    },
    register() {
      this.countDown();
      let Data = {
        id: null,
        name: this.loginName,
        email: this.email,
        password: this.password,
      };
      const res = registerUser(Data).then((res) => {
        if (res.data.status === 200) {
          this.$message.success("验证码已发送");
        } else this.$message.error(res.data.message);
      });
    },
    registerConfirm() {
      let Data = {
        id: null,
        name: this.loginName,
        email: this.email,
        password: this.password,
      };
      const res = registerConfirm(this.checkCode, Data).then((res) => {
        if (res.data.status === 200) {
          this.clearRegister();
          this.toLogin();
        } else this.$message.error(res.data.message);
      });
    },

    //signUp_cancel_Btn method:clear all filled data and switch tab to home
    clearRegister() {
      this.loginName = "";
      this.email = "";
      this.password = "";
      this.rePassword = "";
      this.checkCode == "";
    },
    countDown() {
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.canClick = false;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送验证码";
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.cardBorder {
  margin: auto;
  opacity: 0.9;
  margin-top: 4rem;
  margin-bottom: 2rem;
  border-radius: 1rem !important;
  width: 40%;
  min-height: 70vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 30px;
}

.loginButton {
  border-radius: 30px;
  transition: box-shadow 0.2s ease-out;
  margin: 20px 0;
}

.icons {
  margin-right: 5px;
}
</style>
