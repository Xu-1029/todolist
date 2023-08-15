const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
require("events").EventEmitter.defaultMaxListeners = 0;
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  publicPath: "./",

  devServer: {
    open: true,
    host: "0.0.0.0", // 本地服务器
    port: 80,
    proxy: {
      "/user": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
      "/list": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
      "/task": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
      "/plan": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
      "/summary": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
      "/planTask": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
      "/habit": {
        target: `http://localhost:8080`,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        crypto: require.resolve("crypto-browserify"),
      },
    },
    plugins: [new NodePolyfillPlugin()],
  },
});
