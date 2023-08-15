<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="50%"
    v-model="addDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">添加</v-btn>
    </template>
    <v-card style="border-radius: 15px">
      <v-card-title
        ><v-checkbox v-model="taskDone"></v-checkbox>
        <v-text-field v-model="taskName"></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6"
            ><v-select
              v-model="taskType"
              :items="classMsg"
              label="分类"
              dense
              outlined
            ></v-select
          ></v-col>
          <v-col cols="6">
            <v-select
              :items="computedType"
              v-model="targetType"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-text-field
          v-model="beginDate"
          label="添加开始日期"
          @click="
            showBeginDatePicker = true;
            showEndDatePicker = false;
          "
        ></v-text-field>
        <v-date-picker
          color="rgba(130,215,209,1)"
          v-model="beginDate"
          v-if="showBeginDatePicker"
          @input="showBeginDatePicker = false"
        ></v-date-picker>
        <v-text-field
          v-model="endDate"
          label="添加截止日期"
          @click="
            showEndDatePicker = true;
            showBeginDatePicker = false;
          "
        ></v-text-field>
        <v-date-picker
          color="rgba(130,215,209,1)"
          v-model="endDate"
          v-if="showEndDatePicker"
          @input="showEndDatePicker = false"
        ></v-date-picker>
        <v-divider></v-divider>
        <v-text-field v-model="description" label="添加备注"></v-text-field>
      </v-card-text>
      <v-card-actions style="text-align: right">
        <v-spacer></v-spacer>
        <v-btn text @click="addTask()">确认</v-btn>
        <v-btn text @click="cancelCreate()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addtodoTask",
  props: {},
  data() {
    return {
      addDialog: false,
      //create user
      taskDone: false,
      taskName: "",
      beginDate: null,
      description: "",
      notEmptyRules: [(v) => !!v || "Please fill in the required field"],
      showBeginDatePicker: false,
      endDate: null,
      showEndDatePicker: false,
      taskType: null,
      targetType: null,
      classMsg: ["学习", "工作", "娱乐", "其他"],
    };
  },
  methods: {
    cancelCreate() {
      this.addDialog = false;
      this.taskDone = false;
      this.taskName = null;
      this.beginDate = null;
      this.endDate = null;
      this.description = null;
      this.taskType = null;
      this.targetType = null;
    },
    addTask() {
      let NewTask = {
        taskId: "",
        taskName: this.taskName,
        beginDate: this.beginDate,
        endDate: this.endDate,
        description: this.description,
        taskDone: this.taskDone ? 1 : 0,
        taskType: this.taskType + "-" + this.targetType,
        userId: this.$store.state.id,
      };
      this.$emit("addTask", NewTask);
      this.cancelCreate();
    },
  },
  watch: {
    date(newVal) {
      this.beginDate = newVal;
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
.addTaskBtns {
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 3px 3px 8px #bdbdbd, -3px -3px 8px #ffffff;
  margin-left: 10px;
  text-transform: none;
}

.icons {
  margin: 0 0.5rem;
}
</style>
