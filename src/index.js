const express = require("express");
const app = express();
const { sequelize } = require('./models');

app.use(express.join());
//Sync the models with database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database sync successfully");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("server is running successfully");
    });
  })
  .catch((err) => {
    console.error("Unable to sync the models with database");
  });
