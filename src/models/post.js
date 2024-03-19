const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize('blogging_system_db','root','',{
    host:'localhost',
    dialect:'mysql'
})

const Post=sequelize.define('POST',{
    //Create columns of post table
title:{
    type:DataTypes.STRING,
    allowNull:false,
},
content:{
    type:DataTypes.TEXT,
    allowNull:false,
},
imageUrl:{
    type:DataTypes.STRING,
    allowNull:true,

},
publishedAt:{
    type:DataTypes.DATE,
    allowNull:true,
}

});
const user =require("./users.js");
const Category=require("./category.js");
const comment=require("./comment.js");

Post.belongsTo(user);
Post.hasMany(comment);
belongsToMany(Category, { through: 'postCategoryTable' }); 
module.exports=Post;