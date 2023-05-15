const { Sequelize,DataTypes } = require("sequelize");
const { dbConfig,sqlType } = require("../constant/index");

const seq = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host /* 服务的主机名 */,
  dialect: sqlType /* 选择-->'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  logging: false, // 显示所有日志函数调用参数
});

(async ()=> {
  try {
    await seq.authenticate();
    console.log('----------数据库连接成功----------');
  } catch (error) {
    console.error('----------数据库连接失败----------', error);
  }
})()

module.exports ={
  seq,
  DataTypes
};
