// comment.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../models/main'); 
const Post = require("./post");
const User = require("./user"); 

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

// Define associations with tables
// Comment.belongsTo(Post); 
Comment.associate = () => {
    Comment.belongsTo(User);
  };
module.exports = Comment;
