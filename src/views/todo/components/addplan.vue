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
      <v-card-title>
        <v-text-field
          v-model="planTaskName"
          label="添加计划名称"
        ></v-text-field>
      </v-card-title>
      <v-card-text>
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
        <v-text-field v-model="total" label="添加计划完成次数"></v-text-field>
      </v-card-text>
      <v-card-actions style="text-align: right">
        <v-spacer></v-spacer>
        <v-btn text @click="addplanTask()">确认</v-btn>
        <v-btn text @click="cancelCreate()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addhabit",
  props: {},
  data() {
    return {
      addDialog: false,
      //create user
      planTaskName: "",
      beginDate: null,
      endDate: null,
      total: "",
      showBeginDatePicker: false,
      showEndDatePicker: false,
    };
  },
  methods: {
    cancelCreate() {
      this.addDialog = false;
      this.planTaskName = null;
      this.beginDate = null;
      this.endDate = null;
      this.total = null;
      this.showBeginDatePicker = false;
      this.showEndDatePicker = false;
    },
    addplanTask() {
      let NewTask = {
        planTaskId: "",
        planTaskName: this.planTaskName,
        beginDate: this.beginDate,
        endDate: this.endDate,
        total: this.total,
        done: 0,
        userId: this.$store.state.id,
      };
      this.$emit("addplanTask", NewTask);
      this.cancelCreate();
    },
  },
  watch: {},
  computed: {},
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
