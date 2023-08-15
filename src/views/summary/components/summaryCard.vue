<template>
  <div class="flexLike insetBox">
    <v-row>
      <v-col cols="5">
        <img src="../../../static/tomato_title.png" height="40" />
        <v-card style="border-radius: 15px; height: 650px">
          <v-date-picker
            color="rgba(133, 214, 215,1)"
            v-model="value"
            width="100%"
            class="dataPicker"
          ></v-date-picker>
          <v-card-title>{{ value }} </v-card-title>
          <v-card-text class="cardText">
            <div v-if="task.length === 0">No Task</div>
            <div v-else>
              <v-checkbox
                v-for="(item, index) in task"
                :key="index"
                v-model="item.taskDone"
                :label="item.taskName"
                dense
                disabled
              >
              </v-checkbox>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="7">
        <img src="../../../static/tomato2.png" height="40" />
        <v-row>
          <v-col cols="6">
            <v-card style="border-radius: 15px; height: 20rem">
              <v-card-title>
                {{ new Date().getFullYear() }}年
                {{ new Date().getMonth() + 1 }}月 {{ new Date().getDate() }}日
              </v-card-title>
              <v-card-text>{{ WeekReport }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <div class="stackable-container">
              <v-card
                class="stackable-card habitTask"
                @mouseover="bringCardToFront('habitTask')"
                
              >
                <v-row
                  v-for="(item, index) in habit"
                  :key="index"
                  class="HabitCard"
                  ><v-col cols="5">
                    <span>{{ item.habitName }}</span>
                  </v-col>
                  <v-col cols="6">
                    <v-icon v-if="item.day1 == 1" style="color: green"
                      >mdi-check-circle</v-icon
                    >
                    <v-icon v-else-if="item.day1 == 0" style="color: red"
                      >mdi-close-circle</v-icon
                    >
                    <v-icon v-else-if="item.day1 == null"
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
                  </v-col>
                </v-row>
              </v-card>

              <v-card
                class="stackable-card planTask"
                @mouseover="bringCardToFront('planTask')"
              >
                <v-row
                  v-for="(item, index) in planTask"
                  :key="index"
                  class="planCard"
                >
                  <img src="../../../static/tomato.png" height="20px" />
                  <span>&nbsp&nbsp{{ item.planTaskName }} </span>
                  <v-spacer></v-spacer>
                  <span>{{ item.done }}/{{ item.total }}</span>
                  <v-progress-linear
                    color="rgb(133,214,215)"
                    :value="(item.done / item.total) * 100"
                  ></v-progress-linear>
                </v-row>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card style="border-radius: 15px" class="chartBox">
              <v-row>
                <v-col cols="2">
                  <v-progress-circular
                    :rotate="180"
                    :size="120"
                    :width="8"
                    :value="proportion_task"
                    color="rgb(254,214,232)"
                    class="v-progress-circula"
                  >
                    {{ proportion_task }}%
                  </v-progress-circular>
                  <v-progress-circular
                    :rotate="180"
                    :size="120"
                    :width="8"
                    :value="proportion_ReviewTask"
                    color="rgb(133,214,215)"
                    class="v-progress-circula"
                  >
                    {{ proportion_ReviewTask }}%
                  </v-progress-circular>
                </v-col>
                <v-col cols="10">
                  <div class="echart" id="mychart" :style="myChartStyle"></div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  getSummary,
  getOneDayTask,
  getOneDayReviewTask,
  getAllTask,
  getAllReviewTask,
  getWeekReport,
  getTaskEachDay,
} from "../../../services/summary/index.js";
import { getAllPlanTask } from "../../../services/planTask/index.js";
import { getAllHabit } from "../../../services/habit/index.js";
import * as echarts from "echarts";

export default {
  name: "summaryCard",
  components: {},
  inject: ["reload"],
  data() {
    return {
      type: "month",
      events: [],
      proportion_task: 0,
      proportion_ReviewTask: 0,
      summaryTask: [],
      summaryReviewTask: [],
      value: new Date().toISOString().substr(0, 10),
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      dateTask: [],
      dateReviewTask: [],
      thisDateTask: [],
      allTask: [],
      allReviewTask: [],
      task: [],
      WeekReport: "",
      planTask: [],
      habit: [],
      xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //横坐标
      yData: [0, 0, 0, 0, 0, 0, 0], //数据
      myChartStyle: { float: "left", width: "100%", height: "380px" }, //图表样式
      color: ["rgb(254,214,202)"],
    };
  },
  created() {
    this.viewDay(this.value);
    this.getWeekReport();
    this.getPlanTask();
    this.getAllHabit();
    this.getTaskEachDay();
    this.getSummary();
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue != oldValue) {
        this.viewDay(newValue);
      }
    },
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    bringCardToFront(refName) {
      const habitTaskCard = this.$refs.habitTaskCard;
      const planTaskCard = this.$refs.planTaskCard;
      if (refName === "habitTaskCard") {
        habitTaskCard.style.zIndex = "2";
        planTaskCard.style.zIndex = "1";
      } else if (refName === "planTaskCard") {
        planTaskCard.style.zIndex = "2";
        habitTaskCard.style.zIndex = "1";
      }
    },
    getTaskEachDay() {
      const res = getTaskEachDay().then((res) => {
        if (res.data.status === 200) {
          this.yData[0] = res.data.data.day1;
          this.yData[1] = res.data.data.day2;
          this.yData[2] = res.data.data.day3;
          this.yData[3] = res.data.data.day4;
          this.yData[4] = res.data.data.day5;
          this.yData[5] = res.data.data.day6;
          this.yData[6] = res.data.data.day7;
          this.initEcharts();
        } else this.$message.error(res.data.message);
      });
    },
    initEcharts() {
      // 基本柱状图
      const option = {
        xAxis: {
          data: this.xData,
        },
        yAxis: {},

        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData,
            color: this.color,
          },
        ],
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    getWeekReport() {
      const res = getWeekReport().then((res) => {
        if (res.data.status === 200) {
          let WeekReport = res.data.data;
          this.WeekReport = WeekReport.replace(/[\'\"\\\/\b\f\n\r\t]/g, "");
        } else this.$message.error(res.data.message);
      });
    },
    getAllHabit() {
      const res = getAllHabit().then((res) => {
        if (res.data.status === 200) {
          this.habit = res.data.data;
        } else this.$message.error(res.data.message);
      });
    },
    viewDay(value) {
      let task = [];
      const res = getOneDayTask(value).then((res) => {
        if (res.data.status === 200) {
          const respon = getOneDayReviewTask(value).then((respon) => {
            if (respon.data.status === 200) {
              this.task = res.data.data.concat(respon.data.data);
            } else this.$message.error(respon.data.message);
          });
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
    getSummary() {
      const res = getSummary().then((res) => {
        if (res.data.status === 200) {
          if (res.data.data.taskTotal === 0) {
            this.proportion_task = 0;
          } else {
            const proA = res.data.data.taskDone / res.data.data.taskTotal;
            this.proportion_task = proA * 100;
          }
          if (res.data.data.reviewTaskTotal === 0) {
            this.proportion_ReviewTask = 0;
          } else {
            const proB =
              res.data.data.reviewTaskDone / res.data.data.reviewTaskTotal;
            this.proportion_ReviewTask = proB * 100;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
}
.cardBorder {
  /* margin: 2rem 1.5rem 0 1rem; */
  padding: 1rem;
  border-radius: 1rem !important;
}

.insetBox {
  border-radius: 16px;
  padding: 0.8rem 0.8rem;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin: 1rem;
}

.flexLike {
  display: flex;
  justify-content: center;
  align-content: center;
}
.cardText {
  text-align: left !important;
  overflow-y: auto;
}
.dataPicker {
  margin: auto;
}
.planCard {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
}
.HabitCard {
  font-size: 15px;
  font-weight: 400;
}
.planTask {
  font-size: 15px;
  font-weight: 400;
  border-radius: 15px;
  height: 20rem;
  text-align: justify;
  /* overflow-y: auto; */
  z-index: 0;
  width: 100%;
}
.habitTask {
  border-radius: 15px;
  height: 17rem;
  padding-top: 1rem;
  /* overflow-y: auto; */
  text-align: justify;
  z-index: 1;
  margin-top: 3rem;
  width: 100%;
}
.chartBox {
  margin-top: 0.5rem;
  height: 20rem;
}
.echart {
  margin-top: -3rem;
}
.stackable-card {
  position: absolute;
  top: 0;
  left: 0;
  transition: z-index 0.5s ease;
}
/* 当鼠标悬停在Card上时，将其z-index设置为更高的值，使其在顶部 */
.stackable-card:hover {
  z-index: 2;
}
.stackable-container {
  position: relative;
}
</style>
