const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(function(req,res,next){
  console.log(`${req.method} for ${req.url}`);
  next();
});
let store = new MongoDBStore({
  uri: "mongodb://localhost/a4",
  collection: 'sessions'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name:'igClone-session',
  secret: "some secret here",
  store:store,
  cookie:{maxAge:1800000},
  //to remove warnings
  resave:true,
  saveUninitialized: false
}));

app.set(path.join(__dirname, 'views'));//set views folder
app.set("view engine","pug");
// const commentRoute = require('./Routes/comment');
// const postRoute= require('./Routes/post');
const userRoute= require('./Routes/user');
app.set("view engine","pug");
app.get("/", (req, res)=> { res.render("register"); });
app.use('/user', userRoute);

// app.use('/post', postRoute);
// app.use('/comment', commentRoute);



const uri = "mongodb+srv://instagramClone:R5QMolOXKFN6M7WF@cluster0.qzsuq6e.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


//ATLAS_URI\
//R5QMolOXKFN6M7WF