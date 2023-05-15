const Router = require("koa-router");
//用户模型
const {users} = require("../../sqlTable/index");

const userRule = require("../../validateRule/users");
const validator = require("../../utils/validate");
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
    const { params, error } = await validator(ctx, userRule);
    if (error) return;
    let message = "注册成功";
    let status = "register";
    let data = {};
    //存在账号但是密码不对，那么提示已注册
    const userRes = await users.findOne({
      where: { userName: params.userName },
      raw: true,
    });
    if (userRes && userRes.password !== params.password) {
      message = "账号已注册";
      status = "fail";
      data = null;
    } else {
      const res = await users.findOrCreate({ where: params || {}, raw: true });
      if (res?.length) {
        if (!res[1]) {
          //返回一个数组，前面的对象表示返回数据，最后的布尔值表示是否是新建数据
          message = "登录成功";
          status = "login";
        }
        data = res[0];
      }
    }

    ctx.body = {
      status,
      data,
      message,
    };
  });

module.exports = router;
