<template>
  <v-dialog transition="dialog-bottom-transition" width="50%" v-model="addDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-icon btn v-bind="attrs" v-on="on">mdi-pencil</v-icon>
    </template>
    <v-card style="border-radius: 15px">
      <v-card-title><v-checkbox v-model="curtaskDone"></v-checkbox>
        <v-text-field v-model="curtaskName"></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6"><v-select v-model="curtaskType" :items="classMsg" label="分类" dense
              outlined></v-select></v-col>
          <v-col cols="6">
            <v-select :items="curcomputedType" v-model="curtargetType" dense outlined></v-select>
          </v-col>
        </v-row>
        <v-text-field v-model="curbeginDate" label="添加开始日期" @click="
            showBeginDatePicker = true;
            showEndDatePicker = false;
          "></v-text-field>
        <v-date-picker color="rgba(130,215,209,1)" v-model="curbeginDate" v-if="showBeginDatePicker"
          @input="showBeginDatePicker = false"></v-date-picker>
        <v-text-field v-model="curendDate" label="添加截止日期" @click="
            showEndDatePicker = true;
            showBeginDatePicker = false;
          "></v-text-field>
        <v-date-picker color="rgba(130,215,209,1)" v-model="curendDate" v-if="showEndDatePicker"
          @input="showEndDatePicker = false"></v-date-picker>
        <v-divider></v-divider>
        <v-text-field v-model="curdescription" label="添加备注"></v-text-field>
      </v-card-text>
      <v-card-actions style="text-align: right">
        <v-spacer></v-spacer>
        <v-btn text @click="confirmTask()">确认</v-btn>
        <v-btn text @click="CancelTask()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: "listMsg",
    props: {
      taskId: {
        type: Number,
        required: true,
      },
      taskName: {
        type: String,
        required: true,
      },
      beginDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      taskDone: {
        type: Boolean,
        required: true,
      },
      taskType: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        showBeginDatePicker: false,
        showEndDatePicker: false,
        addDialog: false,
        classMsg: ["学习", "工作", "娱乐", "其他"],
        targetType: "",
        curtaskId: this.taskId,
        curtaskName: this.taskName,
        curbeginDate: this.beginDate,
        curendDate: this.endDate,
        curdescription: this.description,
        curtaskDone: this.taskDone,
        curtaskType: this.taskType.split("-")[0],
        curtargetType: this.taskType.split("-")[1],
      };
    },
    created() { },
    computed: {
      curcomputedType() {
        let study = ["语言", "科学", "艺术", "兴趣", "技能", "考试", "作业"];
        let work = ["会议", "咨询", "测试", "授课", "实验", "策划", "培训"];
        let play = ["游戏", "电影", "音乐", "运动", "阅读", "旅行", "美食"];
        switch (this.curtaskType) {
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
    watch: {},
    methods: {
      confirmTask() {
        let newTask = {
          taskId: this.curtaskId,
          taskName: this.curtaskName,
          beginDate: this.curbeginDate,
          endDate: this.curendDate,
          description: this.curdescription,
          taskDone: this.curtaskDone,
          taskType: this.curtaskType + "-" + this.curtargetType,
          userId: this.$store.state.id,
        };
        this.$emit("confirmTask", newTask);
        this.addDialog = false;
      },
      CancelTask() {
        this.addDialog = false;
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
</style>