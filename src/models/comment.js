
const { DataTypes } = require('sequelize');
const sequelize = require('../models/main');

const Comment=sequelize.define('Comment',{
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
})
 const post=require("./post.js");
 const category=require("./category.js");
 Comment.belongsTo(post);
 Comment.belongsTo(category);
module.exports=Comment;
