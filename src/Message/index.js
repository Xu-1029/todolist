import store from "@/store"

export default {
  //成功提示
  success (data) {
    store.commit("message", {
      type: "success", //message类型
      message: data, //message内容
      time: 5000, //message时长，无设置则默认3s
    })
  },

  //错误提示
  error (data) {
    store.commit("message", {
      type: "error",
      message:data,
      time:5000,
    })
  },

  //消息提示
  info (data) {
    store.commit("message", {
      type: "info",
      message: data,
      time:5000,
    })
  },

  //警告提示
  warning (data) {
    store.commit("message", {
      type: "warning",
      message:data,
      time:5000,
    })
  },
}
