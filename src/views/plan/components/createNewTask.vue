<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="50%"
    v-model="addDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">添加</v-btn>
    </template>
    <v-card style="height: 100%; margin: 0">
      <v-toolbar color="rgba(130,215,209,1)" dark>New Task</v-toolbar>
      <v-card-text style="padding-top: 20px">
        <v-col cols="10" :offset="1" style="padding: 0">
          <v-text-field
            width="90%"
            dense
            outlined
            label="Task Name"
            prepend-icon="mdi-checkbox-marked-circle-plus-outline"
            required
            v-model="taskName"
            :rules="notEmptyRules"
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                outlined
                label="BeginDate"
                prepend-icon="mdi-calendar-range"
                required
                v-model="beginDate"
                @click="
                  showDatePicker = true;
                  showEndDatePicker = false;
                "
                :rules="notEmptyRules"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                outlined
                label="EndDate"
                prepend-icon="mdi-calendar-range"
                required
                v-model="endDate"
                @click="
                  showEndDatePicker = true;
                  showDatePicker = false;
                "
                :rules="notEmptyRules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-date-picker
            color="rgba(130,215,209,1)"
            width="400px"
            v-model="beginDate"
            v-if="showDatePicker"
            @input="showDatePicker = false"
            style="margin-left: 2rem"
          ></v-date-picker>
          <v-date-picker
            color="rgba(130,215,209,1)"
            width="400px"
            v-model="endDate"
            v-if="showEndDatePicker"
            @input="showEndDatePicker = false"
            style="margin-left: 2rem"
          ></v-date-picker>
          <v-text-field
            dense
            outlined
            label="Task content"
            prepend-icon="mdi-comment-text"
            v-model="TaskContent"
          ></v-text-field>
        </v-col>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          @click="cancelCreate()"
          large
          class="addTaskBtns"
          style="width: 20%; margin: 0 15% 1rem"
        >
          <v-icon class="icons">mdi-close</v-icon>Cancel</v-btn
        >

        <v-btn
          @click="addNewTask()"
          large
          class="addTaskBtns"
          style="width: 20%; margin: 0 15% 1rem"
        >
          <v-icon class="icons">mdi-check</v-icon>Create
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "createNewTask",
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      addDialog: false,
      //create user
      taskName: "",
      beginDate: this.date,
      TaskContent: "",
      notEmptyRules: [(v) => !!v || "Please fill in the required field"],
      showDatePicker: false,
      endDate: null,
      showEndDatePicker: false,
    };
  },
  methods: {
    cancelCreate() {
      this.addDialog = false;
      this.taskName = null;
      this.beginDate = this.date;
      this.endDate = null;
      this.TaskContent = null;
      this.endDate = null;
    },
    addNewTask() {
      let NewTask = {
        taskType: 0,
        taskName: this.taskName,
        reviewTaskId: null,
        userId: this.$store.state.id,
        date: null,
        description: this.TaskContent,
        taskDone: 0,
      };
      this.$emit("addNewTask", this.beginDate, this.endDate, NewTask);
      this.cancelCreate();
    },
  },
  watch: {
    date(newVal) {
      this.beginDate = newVal;
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
