const express = require("express");
const app = express();
const path=require("path");
const userRouter =require("../src/routes/router")
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.json());
// Import all models
const sequelize = require("./models/main");
const exp = require("constants");
app.set('view engine',"ejs");
const viewsPath = path.join(__dirname, 'views');
const pathpublic=path.join(__dirname,"public");
console.log("public file",pathpublic);
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(express.static(pathpublic));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Access to css file
app.use(userRouter);
app.get('/', (req, res) => {

   
      res.render("user", ); 
  

});

// Sync database
sequelize.sync({ force: false })
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

  