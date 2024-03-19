const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize('blogging_system_db','root','',{
    host:'localhost',
    dialect:'mysql'
})
const User =sequelize.define('User',{
//Create columns of user table
username:{
    type:DataTypes.STRING,
    allowNull:false,

},
email:{
    type:DataTypes.STRING,
allowNull:false,
},
password:{
    type:DataTypes.STRING,
    allowNull:false,
}


})
//Define the relationship between user and database
const post=require("./post.js");
const comment=require("./comment.js");
User.hasMany(post);
User.hasMany(comment);

module.exports=User;