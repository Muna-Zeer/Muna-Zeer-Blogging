const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize('blogging_system_db','root','',{
    host:'localhost',
    dialect:'mysql'
})

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