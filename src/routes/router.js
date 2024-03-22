const express = require("express");
const app = express();
const fs = require("fs");
const methodOverride = require("method-override");
const path = require("path");
const multer = require("multer");
const { Post } = require("../models");
const {
  createNewUser,
  getAllUsers,
  getUserByID,
  updateUserInfo,
  deleteUserId,
  getUserEditPage,
} = require("../controllers/userController");
const {
  CreatePost,
  getAllPost,
  addPostCategory,
  getCategory,
  getCategoryPost,
  getPostEditPage,
  updatePostInfo,
  deletePost,
  createComment,
  getComments,
  getCommentsPost
} = require("../controllers/postController");
app.use(methodOverride("_method"));

const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

const userRouter = express.Router();
const postRouter = express.Router();
userRouter.post("/createUser", createNewUser);
userRouter.get("/allUsers", getAllUsers);

userRouter.get("/:userId", getUserByID);
userRouter.get("/:userId/edit", getUserEditPage);

userRouter.post("/:userId/update", updateUserInfo);
userRouter.delete("/:userId", deleteUserId);

//Post routes
postRouter.post("/newPost", upload.single("image"), CreatePost);
postRouter.get("/allPosts", getAllPost);
postRouter.post("/:postId/categories", addPostCategory);
postRouter.get("/:postId/addCategory", getCategory);
postRouter.get("/:postId/categories", getCategoryPost);
postRouter.get("/:postId/edit", getPostEditPage);
postRouter.post("/:postId", updatePostInfo);
postRouter.delete("/:postId", deletePost);
postRouter.post("/:postId/comments", createComment);
postRouter.get("/:postId/comments", getCommentsPost);

//Add comment for post
postRouter.get("/addComment", getComments);
module.exports = { userRouter, postRouter };
