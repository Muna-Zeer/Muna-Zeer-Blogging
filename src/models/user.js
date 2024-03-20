const { DataTypes } = require('sequelize');
const { sequelize } = require('./index'); 

// Define the model
const User = sequelize.define('User', {
  // Define your user model attributes here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = User;
