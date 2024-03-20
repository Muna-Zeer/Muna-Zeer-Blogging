// const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');
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