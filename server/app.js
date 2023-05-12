//导入相关模块
const Koa = require("koa2");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const router = require("./router/index.js");
//导入数据库操作
require("./sqlTable/index.js");
//常量
const port = 8090;
//创建实例
const app = new Koa();
//注册使用cors中间件解决跨域
app.use(
  cors({
    origin: function (ctx) {
      // 只有域名在localhost:3000下的请求才能被获得
      return "http://localhost:3000";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 1000,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
//解析post传来的body对象
app.use(bodyParser());
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.use(router());
//监听服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
