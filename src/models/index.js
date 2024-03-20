//import all files from models in index.js to export then 

const User = require('./user');
const Post = require('./post');
const Category = require('./category');
const Comment = require('./comment');

module.exports = { User, Post, Category, Comment };
