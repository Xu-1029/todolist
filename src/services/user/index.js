
import { async } from "regenerator-runtime";
import axios from "../axios";
import store from '../../store'
/**
 * 用户信息
 * @param {*} userId
 * @returns
 */
async function findById() {
    const result = await axios.get("/user/findByUserId");
    return result;
}

/**
 * 更新email
 * @param {*} id
 * @param {*} email
 * @returns
 */
async function updateEmail(email) {
    const result = await axios.post("/user/updateEmail?email=" + email);
    return result;
}

/**
 * 更新密码
 * @param {*} id
 * @param {*} password
 * @returns
 */
async function updatePassword(password) {
    const result = await axios.post("/user/updatePassword?password=" + password);
    return result;
}

export {
    findById,
    updateEmail,
    updatePassword
};
