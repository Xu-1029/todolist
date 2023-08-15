
import { async } from "regenerator-runtime";
import axios from "../axios";
import store from '../../store'

/**
 * getOneDayTask
 * @param {*} userId
 * @param {*} date
 * @returns
 */
async function getOneDayTask(date) {
    const result = await axios.get("/plan/getOneDayTask?date=" + date);
    return result;
}

/**
 * 添加任务
 * @param {*} param
 * @returns
 */
async function insertReviewTask(beginDate, endDate, param) {
    const result = await axios.post("/plan/insertReviewTask?beginDate=" + beginDate + "&endDate=" + endDate, param);
    return result;
}

/**
 * 删除任务
 * @param {*} userId
 * @param {*} date
 * @returns
 */
async function deleteOneTask(date) {
    const result = await axios.delete("/plan/deleteOneTask?date=" + date);
    return result;
}

/**
 * checkForReviewTask
 * @param {*} userId
 * @param {*} date
 * @param {*} taskName
 * @returns
 */
async function checkForReviewTask(date, taskName) {
    const result = await axios.post("/plan/checkForReviewTask?date=" + date + "&taskName=" + taskName);
    return result;
}
export {
    getOneDayTask,
    insertReviewTask,
    deleteOneTask,
    checkForReviewTask

};
