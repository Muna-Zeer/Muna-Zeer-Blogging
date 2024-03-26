
const { Post, Category, Comment,User } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
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

    res.render("postList", { posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
module.exports.getComments = async (req, res) => {
  try {
    const allPosts = await Post.findAll();

    res.render("commentPost", { posts: allPosts });
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

    const createdCategories = await Promise.all(
      categories.map(async (categoryName) => {
        const [category, created] = await Category.findOrCreate({
          where: { category: categoryName },
          defaults: { category: categoryName },
        });
        return category;
      })
    );

    console.log("Selected Categories:", createdCategories);

    // Filter out any null categories
    const validCategories = createdCategories.filter(
      (category) => category !== null
    );

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

module.exports.getCategoryPost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post by its ID
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const categories = await post.getCategories();

    // res.status(200).json(categories);
    res.render("getPostCategory", { categories });
  } catch (error) {
    console.error("Error getting categories for post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.getPostEditPage = async (req, res) => {
  const { postId } = req.params;
  console.log("Editing post with ID:", postId);

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      console.error("Post not found");
      return res.status(404).json({ error: "post not found" });
    }

    res.render("updatePost", { post });
  } catch (error) {
    console.error("Error getting post by ID:", error);
    res.status(500).json({ error: "Unable to fetch post" });
  }
};

module.exports.updatePostInfo = async (req, res) => {
  const { postId } = req.params;
  console.log("Updating post with ID:", postId);
  console.log("Request body:", req.body);

  try {
    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      console.error("Post not found");
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the post
    const [updatedRowsCount, updatedPost] = await Post.update(req.body, {
      where: { id: postId },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      console.error("Post not found");
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("Post updated successfully:", updatedPost);
    res.status(200).json({ message: "success update the post", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Unable to update post" });
  }
};

//Delete Post
module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Unable to delete post" });
  }
};

//Create new comment for specific postId

module.exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      PostId: postId,
      content,
    });
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Unable to create comment" });
  }
};

//Get comments for specific post
module.exports.getCommentsPost = async (req, res) => {
  const { postId } = req.params;
  console.log("Post ID:", postId); 
  try {
    const comments = await Comment.findAll({ where: { postId } });
    console.log("Comments:", comments); 
    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Unable to get comments" });
  }
};

module.exports.displayPostDetails = async (req, res) => {
  try {
    const post = await Post.findAll({
      include: [{ model: User }, { model: Category }, { model: Comment }],
    });
    res.render('postDetails',{ post });
  } catch (error) {
    console.error("Error getting posts with associated data:", error);
    res.status(500).json({ error: "Unable to get posts with associated data" });
  }
};

module.exports.getPostDetailsById=async(req,res)=>{
  const {postId}=req.params;
  try {
    const post = await Post.findByPk(postId,{
      include: [{ model: User }, { model: Category }, { model: Comment }],
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({post});
  } catch (error) {
    console.error('Error getting post details:', error);
    res.status(500).json({ error: 'Unable to get post details' });
  }
}