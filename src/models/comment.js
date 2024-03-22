
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../models/main');
const Post=require("./post")
const Category = require('./category');
class Comment extends Model {}
Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Comment'
});

// Define associations between tables
Comment.belongsTo(Post);
Comment.belongsTo(Category);

module.exports = Comment;