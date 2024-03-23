const { DataTypes, Model } = require('sequelize');
const sequelize = require('../models/main');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Invalid email format",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;
