const express = require("express");
const app = express();
const path=require("path");
const {userRouter,postRouter} =require("../src/routes/router")
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.json());
// Import all models
const sequelize = require("./models/main");
const exp = require("constants");
app.set('view engine',"ejs");
const viewsPath = path.join(__dirname, 'views');
const pathPublic=path.join(__dirname,"public");
console.log("public file",pathPublic);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(express.static(pathPublic));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//Access to css file
app.use("/api/users",userRouter);
app.use("/api/posts",postRouter);
app.get('/user', (req, res) => {
  res.render('user');
});

app.get('/login', (req, res) => {
  res.render('loginUserPage');
});

app.get('/createPost', (req, res) => {
  res.render('createPost');
});

app.get('/', (req, res) => {

  // createPost
  // users
  res.render('layout/index');

  

});


// Sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync the models with the database:", err);
  });

  