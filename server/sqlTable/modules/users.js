// 管理员表--id、账号、密码、姓名
// 导入模块
const { seq, DataTypes } = require("../../db/index");

// 定义模型的属性
const users = seq.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "false"
    },
  },
  {
    /* 模型参数：*/
    // freezeTableName:true,// 强制指定表名
    paranoid: false, // deletedAt:"删除时间"-只是在数据上增加一个标记，避免真正意义上的删除
    tableName: "users",//直接设置表名
    timestamps: true,//开启后默认添加创建时间和修改时间
  }
);
(async () => {
  await users.sync(); // 对象参数{force:true} => 如果表存在则删除
  console.log("已存在users数据表");
})();
// 导出模块
module.exports = users;
