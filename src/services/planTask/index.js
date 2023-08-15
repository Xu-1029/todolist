import { async } from "regenerator-runtime";
import axios from "../axios";
import store from '../../store'

/**
 * getAllPlanTask
 * @param {*} userId
 * @returns
 */
async function getAllPlanTask() {
    const result = await axios.get("/planTask/getAllPlanTask");
    return result;
}

/**
 * insertPlanTask
 * @param {*} userId
 * @returns
 */
async function insertPlanTask(param) {
    const result = await axios.post("/planTask/insertPlanTask", param);
    return result;
}

/**
 * checkForPlanTask
 * @param {*} userId
 * @returns
 */
async function checkForPlanTask(planTaskId) {
    const result = await axios.post("/planTask/checkForPlanTask?planTaskId=" + planTaskId);
    return result;
}

export {
    getAllPlanTask, insertPlanTask, checkForPlanTask
};
