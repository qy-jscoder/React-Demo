// import Schema from 'async-validator'
const Schema = require("async-validator/dist-node").default;

const validate = async (ctx, rules) => {
  const validator = new Schema(rules);
  let params = null;
  switch (ctx.method) {
    case "GET":
      params = ctx.query;
      break;
    case "POST":
      params = ctx.request.body;
      break;
    case "PUT":
      params = ctx.request.body;
      break;
    case "DELETE":
      params = ctx.query;
      break;
    default:
      params = ctx.request.body;
  }
  return await validator
    .validate(params)
    .then(() => {
      return {
        params,
        error: false,
      };
    })
    .catch((err) => {
      // 统一在这里将异常返回给客户端，在业务代码里面就不需要再处理，直接return就行
      ctx.body = {
        status: 'fail',
        message: err.errors.map((r) => r.message).join(";"),
        data:null
      };
      return {
        params: {},
        error: true,
      };
    });
};

module.exports = validate;
