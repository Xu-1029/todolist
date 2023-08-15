


import { async } from "regenerator-runtime";
import axios from "../axios";
import store from '../../store'

/**
 * getAllHabit
 * @param {*} userId
 * @returns
 */
async function getAllHabit() {
    const result = await axios.get("/habit/getAllHabit");
    return result;
}
/**
 * insertHabit
 * @param {*} userId
 * @returns
 */
async function insertHabit(param) {
    const result = await axios.post("/habit/insertHabit", param);
    return result;
}
/**
 * insertHabit
 * @param {*} userId
 * @returns
 */
async function checkForHabit(habitId) {
    const result = await axios.post("/habit/checkForHabit?habitId=" + habitId);
    return result;
}


export {
    getAllHabit,
    insertHabit,
    checkForHabit
};
