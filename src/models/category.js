// const { sequelize} = require('./index');
const { DataTypes } = require('sequelize');
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