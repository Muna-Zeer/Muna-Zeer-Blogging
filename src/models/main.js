
const Sequelize = require("sequelize");
const sequelize = new Sequelize("blogging_system_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;


