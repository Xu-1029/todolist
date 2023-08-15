
import { async } from "regenerator-runtime";
import axios from "../axios";

/**
 * 按月查询task
 * @param {*} id
 * @param {*} year
 * @param {*} month
 * @returns
 */
async function getThisMonthTask(year, month) {
    const result = await axios.get("/summary/getThisMonthTask?year=" + year + "&month=" + month);
    return result;
}

/**
 * 按月查询reviewTask
 * @param {*} id
 * @param {*} year
 * @param {*} month
 * @returns
 */
async function getThisMonthReviewTask(year, month) {
    const result = await axios.get("/summary/getThisMonthReviewTask?year=" + year + "&month=" + month);
    return result;
}

/**
 * 按天查询task
 * @param {*} id
 * @param {*} date
 * @returns
 */
async function getOneDayTask(date) {
    const result = await axios.get("/summary/getOneDayTask?date=" + date);
    return result;
}

/**
 * 按天查询reviewTask
 * @param {*} id
 * @param {*} date
 * @returns
 */
async function getOneDayReviewTask(date) {
    const result = await axios.get("/summary/getOneDayReviewTask?date=" + date);
    return result;
}

/**
 * summary
 * @param {*} id
 * @returns
 */
async function getSummary() {
    const result = await axios.get("/summary/getSummary");
    return result;
}
/**
 * 周报
 * @param {*} id
 * @returns
 */
async function getWeekReport() {
    const result = await axios.get("/summary/getWeekReport");
    return result;
}
/**
 * getAllTask
 * @param {*} id
 * @returns
 */
async function getAllTask() {
    const result = await axios.get("/summary/getAllTask");
    return result;
}

/**
 * getAllReviewTask
 * @param {*} id
 * @returns
 */
async function getAllReviewTask() {
    const result = await axios.get("/summary/getAllReviewTask");
    return result;
}

/**
 * getTaskEachDay
 * @param {*} id
 * @returns
 */
async function getTaskEachDay() {
    const result = await axios.get("/summary/getTaskEachDay");
    return result;
}



export {
    getThisMonthTask,
    getThisMonthReviewTask,
    getOneDayTask,
    getOneDayReviewTask,
    getSummary,
    getWeekReport,
    getAllTask,
    getAllReviewTask,
    getTaskEachDay
};
