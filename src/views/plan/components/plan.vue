<template>
  <div class="flexLike insetBox">
    <v-row>
      <v-col cols="6">
        <img src="../../../static/tomato_title.png" height="40" />
        <v-card style="border-radius: 15px">
          <v-date-picker
            color="rgba(133, 214, 215,1)"
            v-model="date"
            width="100%"
            class="dataPicker"
            @input="getDateTask"
          ></v-date-picker>
        </v-card>
        <br />
        <v-card style="border-radius: 15px" min-height="120px">
          <v-card-title
            style="
              font-family: Luna;
              font-size: 1.2rem;
              color: #d44242 !important;
              margin-left: 2rem;
            "
          >
            {{ new Date().getFullYear() }}
            <!-- <img
              src="../../../static/tomato2.png"
              width="40px"
              height="40px"
              style="margin-left: 30rem"
            /> -->
          </v-card-title>
          <v-card-text class="DateMsg">
            {{ Week[new Date().getDay()] }},
            {{ Month[new Date().getMonth()] }}
            {{ new Date().getDate() }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <img src="../../../static/tomato2.png" height="40" />
        <v-card
          style="border-radius: 15px"
          elevation="1"
          class="TaskMsg mx-auto cardText"
        >
          <v-card-title
            ><span>{{ `${date}日任务` }}</span>
            <v-spacer></v-spacer>
            <createNewTask
              @addNewTask="addNewTask"
              :date="date"
            ></createNewTask>
          </v-card-title>
          <v-card-text>
            <span v-if="TaskList.length === 0">今日无任务</span>
            <v-list v-else>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, index) in TaskList" :key="index">
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                      v-model="item.taskDone"
                      @click="TodoReviewTask(item)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.taskName }} </v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import createNewTask from "./createNewTask.vue";
import {
  getOneDayTask,
  insertReviewTask,
  checkForReviewTask,
} from "../../../services/reviewTask/index.js";
export default {
  name: "planCard",
  components: {
    createNewTask,
  },
  data: () => {
    return {
      date: "",
      TaskList: [],
      Week: ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"],
      Month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "'May'",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  created() {
    this.date = new Date().toISOString().substr(0, 10);
    this.getDateTask();
  },
  methods: {
    getDateTask() {
      const res = getOneDayTask(this.date).then((res) => {
        if (res.data.status === 200) {
          this.TaskList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    addNewTask(beginDate, endDate, NewTask) {
      const res = insertReviewTask(beginDate, endDate, NewTask).then((res) => {
        if (res.data.status === 200) {
          this.getDateTask();
        } else this.$message.error(res.data.message);
      });
    },
    TodoReviewTask(item) {
      const res = checkForReviewTask(this.date, item.taskName).then((res) => {
        if (res.data.status === 200) {
          this.getDateTask();
        } else this.$message.error(res.data.message);
      });
    },
  },
};
</script>

<style scoped>
.TaskMsg {
  /* margin: 0rem 0rem 1rem 0rem; */
  height: 650px;
}
.insetBox {
  border-radius: 16px;
  padding: 0.8rem 0.8rem;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin: 1rem;
}

.flexLike {
  display: flex;
  justify-content: center;
  align-content: center;
}
.backgroung_img {
  margin: auto;
}
.cardText {
  background-image: url(../../../static/card_bg.png);
  position: relative;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  text-align: left;
}
@font-face {
  font-family: Luna;
  src: url(../../../static/font/Luna.ttf);
}
.DateMsg {
  font-family: Luna;
  font-size: 2rem;
  margin: auto;
  color: #d44242 !important;
}
</style>
