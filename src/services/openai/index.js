import { async } from "regenerator-runtime";
/**
 * gpt
 * @param {*} param
 * @returns
 */
async function ToGpt(param) {
    const result = await axios.post("/post", param);
    return result;
}
export {
    ToGpt
}
