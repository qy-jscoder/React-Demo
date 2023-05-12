const compose = require("koa-compose");
const glob = require("glob");
const { resolve } = require("path");

//多路由整合
module.exports = () => {
  let routers = [];
  glob
    .sync(resolve(__dirname, "./", "**/*.js"))
    .filter((value) => value.indexOf("index.js") === -1)
    .forEach((router) => {
      routers.push(require(router).routes());
      routers.push(require(router).allowedMethods());
    });
  return compose(routers);
};
