import Sequelize from 'sequelize';

const sequelizeInstance = new Sequelize('blogging_system_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = require('./user');
const Post = require('./post');
const Category = require('./category');
const Comment = require('./comment');


module.exports = { sequelize: sequelizeInstance, User, Post, Category, Comment };
