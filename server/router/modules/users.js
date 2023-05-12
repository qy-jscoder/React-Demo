const Router = require("koa-router");

const users = require("../../sqlTable/modules/users");

const router = new Router();
router
  .post("/alterUser", async (ctx) => {
    const params = ctx.request.body;
    await users.update({ role: params.role }, { where: { id: params.id } });
    ctx.body = {
      status: "success",
      data: null,
      message: "修改成功",
    };
  })
  .get("/getAllUsers", async (ctx) => {
    const res = await users.findAll();
    ctx.body = {
      status: "success",
      data: res || [],
      message: "请求成功",
    };
  })
  .post("/deleteUser", async (ctx) => {
    const params = ctx.request.body;
    await users.destroy({ where: { id: params.id } });
    ctx.body = {
      status: "success",
      data: null,
      message: "删除成功",
    };
  })
  .post("/registerLogin", async (ctx) => {
    const params = ctx.request.body;
    let message = "注册成功";
    let status = "register";
    let data = {};
    const res = await users.findOrCreate({ where: params, raw: true });
    if (res?.length) {
      if (!res[1]) {
        //返回一个数组，前面的对象表示返回数据，最后的布尔值表示是否是新建数据
        message = "登录成功";
        status = "login";
      }
      data = res[0];
    }
    ctx.body = {
      status,
      data,
      message,
    };
  });

module.exports = router;
