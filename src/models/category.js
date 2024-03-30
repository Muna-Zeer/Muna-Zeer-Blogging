// category.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../models/main');

class Category extends Model {}
Category.init({
    category: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
}, {
    sequelize,
    modelName: 'Category'
});

module.exports = Category;
