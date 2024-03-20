const express = require("express");
// const { sequelize } = require('./models/index.js');
const app = express();

app.use(express.json());

const Sequelize = require("sequelize");

const sequelizeInstance = new Sequelize("blogging_system_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
sequelizeInstance
  .authenticate()
  .then(() => {
    console.log("Database synced successfully");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync the models with the database:", err);
  });
