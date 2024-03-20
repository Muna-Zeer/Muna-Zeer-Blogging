// const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');
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
const user =require("./user.js");
const Category=require("./category.js");
const comment=require("./comment.js");

Post.belongsTo(user);
Post.hasMany(comment);
Post.belongsToMany(Category, { through: 'postCategoryTable' }); 
module.exports=Post;