import { async } from "regenerator-runtime";
import axios from "axios";

/**
 * 账户注册
 * @param {*} param
 * @returns
 */
async function registerUser(param) {
  const result = await axios.post("/user/register", param);
  return result;
}

/**
 * 账户确认注册
 * @param {*} param
 * @param {*} number
 * @returns
 */
async function registerConfirm(number, param) {
  const result = await axios.post("/user/register/confirm?number=" + number, param);
  return result;
}

/**
 * 账户登录
 * @param {*} name
 * @param {*} password
 * @returns
 */
async function loginUser(name, password) {
  const result = await axios.get("/user/login?name=" + name + "&password=" + password);
  return result;
}



export {
  registerUser,
  loginUser,
  registerConfirm
};
