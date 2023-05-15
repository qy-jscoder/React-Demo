module.exports = {
  // 写法与element-ui的表单规则相同
  userName: {
    type: "string",
    required: true,
    min: 3,
    message: "password rule error",
  },
  password: {
    type: "string",
    min: 3,
    required: true,
    message: "password rule error",
  },
};
