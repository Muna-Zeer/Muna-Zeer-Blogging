const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize('blogging_system_db','root','',{
    host:'localhost',
    dialect:'mysql'
})

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