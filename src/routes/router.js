const express=require("express");
const app=express();
const methodOverride = require('method-override');

const {createNewUser,getAllUsers,getUserByID,updateUserInfo,deleteUserId,getUserEditPage} =require("../controllers/userController");

app.use(methodOverride('_method'));
const userRouter=express.Router();

userRouter.post('/api/users',createNewUser);
userRouter.get('/api/allUsers',getAllUsers);
userRouter.get('/api/users/:userId', getUserByID);
userRouter.get('/api/users/:userId/edit', getUserEditPage);

userRouter.post('/api/users/:userId/update', updateUserInfo);
userRouter.delete('/api/users/:userId/delete', deleteUserId);

  
  


module.exports=userRouter ;