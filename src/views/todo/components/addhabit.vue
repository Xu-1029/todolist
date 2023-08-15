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
        <v-text-field v-model="habitName" label="添加习惯名称"></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="beginDate"
          label="添加开始日期"
          @click="showBeginDatePicker = true"
        ></v-text-field>
        <v-date-picker
          color="rgba(130,215,209,1)"
          v-model="beginDate"
          v-if="showBeginDatePicker"
          @input="showBeginDatePicker = false"
        ></v-date-picker>

        <v-divider></v-divider>
        <v-text-field v-model="lastDays" label="添加持续天数"></v-text-field>
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
  name: "addhabit",
  props: {},
  data() {
    return {
      addDialog: false,
      //create user
      habitName: "",
      beginDate: null,
      lastDays: "",
      showBeginDatePicker: false,
    };
  },
  methods: {
    cancelCreate() {
      this.addDialog = false;
      this.habitName = null;
      this.beginDate = null;
      this.lastDays = null;
      this.showBeginDatePicker = false;
    },
    addTask() {
      let NewTask = {
        HabitId: "",
        habitName: this.habitName,
        beginDate: this.beginDate,
        lastDays: this.lastDays,
        userId: this.$store.state.id,
      };
      this.$emit("addHabitTask", NewTask);
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
