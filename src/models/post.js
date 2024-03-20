const { DataTypes } = require('sequelize');
const sequelize = require('../models/main');

const Post = sequelize.define('Post', {
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
        allowNull: true
    }
});

module.exports = Post;
