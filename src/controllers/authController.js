const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {
  validateUserName,
  validatePassword,
  validateEmail,
} = require("../errorHandlers/errorhandler");
const { User } = require("../models");
//Write function to generate secret key
const { generateKey } = require("../utils/helper"); 
const secretKey = process.env.JWT_SECRET || generateKey();
console.log("secretKey",secretKey);
module.exports.createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!validateUserName(username)) {
      return res.status(400).json({ error: "Invalid username " });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create({
      username: username,
      password: hash,
      email: email,
    });
    console.log("New user created:", newUser);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
//Login user to the website
module.exports.loginUser = async (req, res) => {
  try {
    const { password, identifier } = req.body;
    console.log("Identifier:", identifier);
    console.log("Password:", password);

    let user;
    if (validateEmail(identifier)) {
      user = await User.findOne({ where: { email: identifier } });
    } else if (validateUserName(identifier)) {
      user = await User.findOne({ where: { username: identifier } });
    } else {
      return res.status(400).json({ error: "Invalid email or username" });
    }

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    console.log("Is Password Correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Wrong username or password!" });
    }

    console.log("Login successful");

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
console.log("secretKey",secretKey);
res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Middleware to verify JWT token

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token; 
    console.log("value of token");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};




module.exports.verifyUserIdToken=(req,res,next)=>{
    const {userId}=req.params;
    if(req.user && req.user.userId===userId){
        next();
    }
    else{
        return res.status(403).json({error:"Forbidden you don't have permission to access "})
    }
}