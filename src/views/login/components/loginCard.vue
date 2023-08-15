<template>
  <v-card class="cardBorder" justify="center">
    <v-form v-model="valid" style="width: 100%">
      <v-row justify="center" class="loginMode">
        <v-col cols="12" sm="10">
          <!-- username or email in fact:debatable email rules!!!! -->
          <v-text-field
            v-model="loginName"
            :rules="notEmptyRules"
            label="Username"
            required
            :height="35"
            prepend-icon="mdi-account"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="pwdInput ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="notEmptyRules"
            :type="pwdInput ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock-outline"
            required
            @click:append="pwdInput = !pwdInput"
            :height="35"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="rgb(133,214,215)"
            elevation="1"
            class="loginButton"
            @click="loginSubmit()"
            height="45px"
            block
            style="font-size: 17px"
            >LOGIN
          </v-btn>

          <v-row
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 2em;
            "
          >
            <v-btn text @click="toSignUp()"
              ><v-icon class="icons">mdi-account-plus-outline</v-icon>Sign
              Up</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { loginUser } from "../../../services/umps/index.js";
import { findById } from "../../../services/user/index.js";
export default {
  name: "loginCard",
  data: () => {
    return {
      email: "",
      loginName: "",
      password: "",
      pwdInput: false,
      notEmptyRules: [(v) => !!v || "Please fill in the required field"],
      valid: true,
      token: null,
    };
  },
  methods: {
    loginSubmit() {
      //api
      let data = new FormData();
      let result = loginUser(this.loginName, this.password).then((res) => {
        if (res.data.status == 200) {
          this.$message.success("Login success");
          //register successfully
          this.$store.commit("SET_TOKEN", res.data.message);
          this.$store.commit("SET_LOGINNAME", this.loginName);
          this.$store.commit("SET_LOGINTIME", new Date().getTime());
          this.$store.commit("SET_ID", res.data.data);
          this.getUserMessage();
          this.loginName = null;
          this.password = null;
          this.$router.push("/summary");
        } else {
          //regitser failed
          //'Login Failed.Please try again!'
          this.$message.error(res.data.message);
        }
      });
    },
    getUserMessage() {
      const res = findById().then((res) => {
        if (res.data.status === 200) {
          this.$store.commit("SET_MAIL", res.data.data.email);
        } else this.$message.error(res.data.message);
      });
    },
    toTodo() {
      this.$router.push("/todo");
    },
    toSignUp() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.cardBorder {
  margin: auto;
  opacity: 0.9;
  margin-top: 4rem;
  margin-bottom: 18rem;
  border-radius: 1rem !important;
  width: 40%;
  min-height: 40vh;
  /* background: #ffffff; */
  display: flex;
  justify-content: center;
  align-content: center;
  /* padding-top: 30px; */
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
