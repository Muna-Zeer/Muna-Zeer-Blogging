const { DataTypes, Model } = require('sequelize');
const sequelize = require('../models/main');
const Category = require('./category');
const Comment = require('./comment');
const User = require('./user');

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize,
    modelName: 'Post'
});

Post.belongsTo(User, { foreignKey: 'userId' }); 
Post.belongsToMany(Category, { through: 'PostCategories' });
Post.hasMany(Comment); 

module.exports = Post;