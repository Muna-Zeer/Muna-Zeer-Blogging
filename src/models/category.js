const { DataTypes } = require('sequelize');
const sequelize = require('../models/main');
const Post =require('./post')
const Category=sequelize.define('Category',{
    //Create columns of category table
category:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
},


})
Category.belongsToMany(Post, { through: 'postCategoryTable' });
module.exports=Category;


