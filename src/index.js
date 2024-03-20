const express = require("express");
const app = express();
app.use(express.json());
const sequelize = require("./models/main");

// Import all models
const models = require("./models");

// Sync database
sequelize.sync({ force: true })
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
