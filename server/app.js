//导入相关模块
const Koa = require("koa2");
const { Client } = require("pg");
const Router = require("koa-router");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

//常量
const port = 8090;

//创建实例
const app = new Koa();
const router = new Router();
const client = new Client({
  //postgreSQL配置
  user: "postgres",
  host: "127.0.0.1",
  database: "postgres",
  password: "123456",
  port: 5432,
});
//连接数据库
client.connect();

//注册使用中间件
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
app.use(router.routes(), router.allowedMethods());

//修改用户
router.post("/alterUser", async (ctx) => {
  const params = ctx.request.body;
  const res = await client.query("update users set role=$1 where id=$2", [
    params.role,
    params.id,
  ]);
  let message = "修改失败";
  let status = "fail";
  if (res.rowCount) {
    status = "success";
    message = "修改成功";
  }
  ctx.body = {
    status: status,
    data: null,
    message: message,
  };
});
//添加用户
router.post("/addUser", async (ctx) => {
  const params = ctx.request.body;
  const res = await client.query(
    "insert into users (user_name,password) values($1,$2)",
    [params.userName, params.password]
  );
  let message = "添加失败";
  let status = "fail";
  let data = null;
  if (res.rowCount) {
    status = "success";
    message = "添加成功";
  }
  ctx.body = {
    status: status,
    data: data,
    message: message,
  };
});
//获取全部用户数据
router.get("/getAllUsers", async (ctx) => {
  const res = await client.query("select * from users");
  ctx.body = {
    status: "success",
    data: res.rows,
    message: "请求成功",
  };
});
//删除用户
router.post("/deleteUser", async (ctx) => {
  const params = ctx.request.body;
  await client.query("delete from users where id=$1", [params.id]);
  ctx.body = {
    status: "success",
    data: null,
    message: "删除成功",
  };
});
//监听服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
