// Import the Post model
const { Post, Category } = require("../models");
const fs = require("fs");
const { Op } = require('sequelize');
module.exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filename = req.file.filename;
    return res
      .status(200)
      .json({ message: "File uploaded successfully", imageUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// Create new post
module.exports.CreatePost = async (req, res) => {
  try {
    const imageUrl = req.file.filename;
    console.log("image", imageUrl);

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      imageUrl: imageUrl,
      publishedAt: req.body.publishedAt,
    });
    // const category=await Category.create({category:req.body.categories})
    // if(req.body.categories&&req.body.categories.length>0){
    //   for(const categoryId of req.body.categories){
    //     const category=Category.findByPk(categoryId);
    //     if(category){
    //       await newPost.addCategory(category);
    //     }
    //   }
    // }
    console.log("newPost");
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports.getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    // Pass the correct variable name 'posts' to the template
    res.render("postList", { posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports.addPostCategory = async (req, res) => {
  try {
    const { postId } = req.params;
    const { categories } = req.body;
    console.log("Received Categories:", categories); 

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const createdCategories = await Promise.all(categories.map(async categoryName => {
      const [category, created] = await Category.findOrCreate({
        where: { category: categoryName },
        defaults: { category: categoryName }
      });
      return category;
    }))
      
    console.log("Selected Categories:", createdCategories); 

    // Filter out any null categories
    const validCategories = createdCategories.filter(category => category !== null);

    await post.addCategories(validCategories);

    res.redirect(`/`);
  } catch (error) {
    console.error("Error adding categories to post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.getCategory = async (req, res) => {
  try {
    const { postId } = req.params;
    const { categories } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.render("addCategoryForm", { postId: postId });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
