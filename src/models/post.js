// post.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../models/main');
const Category = require('./category');
const User=require("./user")
const Comment=require("./comment");
class Post extends Model {}
Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
}, {
    sequelize,
    modelName: 'Post'
});

Post.belongsToMany(Category, { through: 'PostCategories' });
Post.associate = () => {
    Post.belongsTo(User);
  };
Post.hasMany(Comment); 
module.exports = Post;