<template>
  <div class="flexLike insetBox">
    <v-row>
      <v-col cols="6">
        <img src="../../../static/tomato_title.png" height="40" />
        <v-card style="border-radius: 15px" class="cardText">
          <v-card-title>
            待办事项
            <v-spacer></v-spacer>
            <addtodoTask @addTask="addTask"></addtodoTask>
          </v-card-title>
          <v-list>
            <v-list-item-group>
              <v-row>
                <v-col cols="5" style="margin-left: 2rem">
                  <v-select
                    v-model="taskType"
                    :items="classMsg"
                    label="分类"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select :items="computedType" v-model="targetType" dense>
                  </v-select>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
              <div class="listStyle">
                <v-list-item v-for="(item, index) in showTaskList" :key="index">
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                      v-model="item.taskDone"
                      @click="DoTask(item)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title dense
                      >{{ item.taskName }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.beginDate }}to{{
                        item.endDate
                      }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <listMsg
                    :taskId="item.taskId"
                    :taskName="item.taskName"
                    :beginDate="item.beginDate"
                    :endDate="item.endDate"
                    :description="item.description"
                    :taskDone="item.taskDone"
                    :taskType="item.taskType"
                    @confirmTask="confirmTask"
                  ></listMsg>
                  <v-icon btn class="deleteIcons" @click="DeleteTask(item)"
                    >mdi-delete</v-icon
                  >
                </v-list-item>
              </div>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="6">
        <img src="../../../static/tomato_mini.png" height="40" />
        <v-card style="border-radius: 15px; height: 20rem">
          <v-card-title>
            每日习惯 <v-spacer></v-spacer
            ><addhabit @addHabitTask="addHabitTask"></addhabit
          ></v-card-title>
          <v-row v-for="(item, index) in habit" :key="index" class="HabitCard"
            ><v-col cols="4">
              <span>{{ item.habitName }}</span>
            </v-col>

            <v-icon btn v-if="item.day1 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon btn v-else-if="item.day1 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon btn v-else-if="item.day1 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-icon v-if="item.day2 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else-if="item.day2 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon v-else-if="item.day2 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-icon v-if="item.day3 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else-if="item.day3 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon v-else-if="item.day3 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-icon v-if="item.day4 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else-if="item.day4 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon v-else-if="item.day4 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-icon v-if="item.day5 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else-if="item.day5 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon v-else-if="item.day5 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-icon v-if="item.day6 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else-if="item.day6 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon v-else-if="item.day6 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-icon v-if="item.day7 == 1" style="color: green"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else-if="item.day7 == 0" style="color: red"
              >mdi-close-circle</v-icon
            >
            <v-icon v-else-if="item.day7 == null"
              >mdi-checkbox-blank-circle</v-icon
            >
            <v-btn text @click="doneHabit(item)" style="margin: auto"
              >今日打卡</v-btn
            >
          </v-row>
        </v-card>
        <v-card id="planTask">
          <v-card-title>
            长期计划 <v-spacer></v-spacer
            ><addplan @addplanTask="addplanTask"></addplan
          ></v-card-title>
          <v-row
            v-for="(item, index) in planTask"
            :key="index"
            class="planCard"
          >
            <v-col cols="1">
              <img src="../../../static/tomato.png" height="20px"
            /></v-col>
            <v-row>
              <v-col cols="4"
                ><span>{{ item.planTaskName }} </span></v-col
              >
              <v-col cols="3" :offset="3">
                <span>{{ item.done }}/{{ item.total }}</span>
              </v-col>
              <v-col cols="2">
                <v-btn
                  outlined
                  @click="donePlan(item)"
                  style="margin-right: 1rem"
                  >打卡</v-btn
                >
              </v-col>
              <v-progress-linear
                color="rgb(133,214,215)"
                :value="(item.done / item.total) * 100"
              ></v-progress-linear>
            </v-row>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import listMsg from "./listMsg";
import addtodoTask from "./addtodoTask";
import addhabit from "./addhabit";
import addplan from "./addplan";
import {
  getAllPlanTask,
  insertPlanTask,
  checkForPlanTask,
} from "../../../services/planTask/index.js";
import {
  getAllHabit,
  insertHabit,
  checkForHabit,
} from "../../../services/habit/index.js";
import {
  insert,
  findByTaskName,
  deleteByTaskId,
  update,
  checkForTask,
  getTypeTask,
} from "../../../services/task/index.js";
export default {
  name: "todoCard",
  components: { listMsg, addtodoTask, addhabit, addplan },
  props: {},
  data: () => {
    return {
      item: 0,
      showTaskList: [],

      taskType: "",
      classMsg: ["学习", "工作", "娱乐", "其他"],
      changeDialog: false,
      type: "",
      targetType: "",
      planTask: [],
      habit: [],
    };
  },
  created() {
    this.getTask(this.type);
    this.getPlanTask();
    this.getAllHabit();
  },
  methods: {
    donePlan(item) {
      const res = checkForPlanTask(item.planTaskId).then((res) => {
        if (res.data.status === 200) {
          this.getPlanTask();
        }
      });
    },
    DeleteTask(item) {
      const res = deleteByTaskId(item.taskId).then((res) => {
        if (res.data.status === 200) {
          this.getTask(this.type);
        }
      });
    },
    DoTask(item) {
      const res = checkForTask(item.taskId).then((res) => {
        if (res.data.status === 200) {
          this.getTask(this.type);
        }
      });
    },
    addTask(newTask) {
      const res = insert(newTask).then((res) => {
        if (res.data.status === 200) {
          this.getTask(this.type);
        }
      });
    },
    confirmTask(changeTask) {
      const res = update(changeTask).then((res) => {
        if (res.data.status === 200) {
          this.getTask(this.type);
        }
      });
    },

    getTask(taskType) {
      const res = getTypeTask(taskType).then((res) => {
        if (res.data.status == 200) {
          this.showTaskList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getAllHabit() {
      const res = getAllHabit().then((res) => {
        if (res.data.status === 200) {
          this.habit = res.data.data;
        } else this.$message.error(res.data.message);
      });
    },
    getPlanTask() {
      const res = getAllPlanTask().then((res) => {
        if (res.data.status === 200) {
          this.planTask = res.data.data;
        }
      });
    },
    addHabitTask(NewTask) {
      const res = insertHabit(NewTask).then((res) => {
        if (res.data.status === 200) {
          this.getAllHabit();
        }
      });
    },
    doneHabit(item) {
      const res = checkForHabit(item.habitId).then((res) => {
        if (res.data.status === 200) {
          this.getAllHabit();
        }
      });
    },
    addplanTask(task) {
      const res = insertPlanTask(task).then((res) => {
        if (res.data.status === 200) {
          this.getPlanTask();
        }
      });
    },
  },
  watch: {
    taskType(newVal, oldVal) {
      this.type = newVal;
      this.getTask(newVal);
    },
    targetType(newVal, oldVal) {
      this.type = this.taskType + "-" + newVal;
      this.getTask(this.type);
    },
  },
  computed: {
    computedType() {
      let study = ["语言", "科学", "艺术", "兴趣", "技能", "考试", "作业"];
      let work = ["会议", "咨询", "测试", "授课", "实验", "策划", "培训"];
      let play = ["游戏", "电影", "音乐", "运动", "阅读", "旅行", "美食"];
      switch (this.taskType) {
        case "学习":
          return study;
        case "工作":
          return work;
        case "娱乐":
          return play;
      }
      return [];
    },
  },
};
</script>

<style scoped>
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

.addNewList {
  padding: 1rem 1rem 0rem 1rem;
  margin: auto;
}
.cardText {
  background-image: url(../../../static/card_bg.png);
  position: relative;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  text-align: left;
  height: 650px;
}
.listStyle {
  overflow-x: hidden;
  overflow-y: auto;
  margin-left: 1rem;
  margin-right: 1rem;
  text-align: left;
}
.deleteIcons {
  padding-left: 1rem;
  margin-right: 1rem;
}
.HabitCard {
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  margin-left: 1rem;
}
#planTask {
  font-size: 15px;
  font-weight: 400;
  border-radius: 15px;
  height: 19rem;
  text-align: justify;
  margin-top: 1rem;
  overflow-y: auto;
}
.planCard {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 1rem;
}
</style>
