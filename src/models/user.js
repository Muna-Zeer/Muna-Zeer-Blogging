const { DataTypes } = require('sequelize');
const sequelize = require('./main');
const{isEmail}=require('validator');
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
isEmail:{
    msg:"Invalid an email format"
}
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
