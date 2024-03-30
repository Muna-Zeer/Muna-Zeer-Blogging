const express = require("express");
const app = express();
const fs = require("fs");
const methodOverride = require("method-override");
const path = require("path");
const multer = require("multer");
const { Post } = require("../models");
const {
  getAllUsers,
  getUserByID,
  updateUserInfo,
  deleteUserId,
  getUserEditPage,
} = require("../controllers/userController");
const {createNewUser,loginUser,verifyUserIdToken,verifyToken}=require("../controllers/authController")
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
  getCommentsPost,
  displayPostDetails,
  getPostDetailsById
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


userRouter.post('/loginUser', loginUser);
userRouter.get("/allUsers", getAllUsers);

userRouter.get("/:userId",verifyToken, getUserByID);
userRouter.get("/:userId/edit", verifyToken,getUserEditPage);

userRouter.post("/:userId/update", verifyToken,updateUserInfo);
userRouter.delete("/:userId",verifyToken, deleteUserId);

//Post routes
postRouter.post("/newPost", upload.single("image"), CreatePost);
postRouter.get("/allPosts", getAllPost);
postRouter.post("/:postId/categories", verifyToken,addPostCategory);
postRouter.get("/:postId/addCategory", verifyToken,getCategory);
postRouter.get("/:postId/categories",verifyToken, getCategoryPost);
postRouter.get("/:postId/edit",verifyToken, getPostEditPage);
postRouter.post("/:postId",verifyToken, updatePostInfo);
postRouter.delete("/:postId", verifyToken,deletePost);
postRouter.post("/:postId/comments",verifyToken, createComment);
postRouter.get("/:postId/comments", verifyToken,getCommentsPost);

//Add comment for post
postRouter.get("/addComment", getComments);

//Get all posts with associated users, categories, and comments
postRouter.get("/postDetails",verifyToken,displayPostDetails)
postRouter.get("/:postId/postDetails",verifyToken,getPostDetailsById)


module.exports = { userRouter, postRouter };



