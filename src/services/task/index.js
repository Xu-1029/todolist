
import { async } from "regenerator-runtime";
import axios from "../axios";
import store from '../../store'

/**
 * 查询任务
 * @param {*} userId
 * @returns
 */
async function findByTaskName(taskName) {
  const result = await axios.get("/task/findByTaskName?taskName=" + taskName);
  return result;
}

/**
 * 添加任务 1
 * @param {*} param
 * @returns
 */
async function insert(param) {
  const result = await axios.post("/task/insertByTask", param);
  return result;
}

/**
 * 删除任务
 * @param {*} userId
 * @param {*} listName
 * @param {*} taskName
 * @returns
 */
async function deleteByTaskId(taskId) {
  const result = await axios.delete("/task/deleteByTaskId?taskId=" + taskId);
  return result;
}
/**
 * 更新任务
 * @param {*} param
 * @returns
 */
async function update(param) {
  const result = await axios.post("/task/update", param);
  return result;
}

/**
 * checkForTask
 * @param {*} userId
 * @param {*} listName
 * @param {*} taskName
 * @returns
 */
async function checkForTask(taskId) {
  const result = await axios.post("/task/checkForTask?taskId=" + taskId);
  return result;
}
/**
 * 查询任务类型
 * @param {*} taskType
 * @returns
 */
async function getTypeTask(taskType) {
  const result = await axios.get("/task/getTypeTask?taskType=" + taskType);
  return result;
}
export {
  findByTaskName,
  insert,
  deleteByTaskId,
  update,
  checkForTask,
  getTypeTask

};
