const connection = require("./model");
const express = require("express");

const app = express();
const path = require("path");
const expressHandlerbars = require("express-handlebars");
const bodyparser = require("body-parser");
const { application } = require("express");

const PORT = process.env.PORT || 4000;

const mainController = require("./controller/route");

app.use(express.json());

app.set('views', path.join(__dirname, "/views/"));

app.engine("hbs", expressHandlerbars({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: __dirname + "/views/layouts"
}));

app.set("view engine", "hbs");

app.get("/",(req,res) => {
 
    res.render("index", {});
   
});

app.use(function (req, res, next) {

  
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use("",mainController);

app.listen(PORT,(req,res) =>{
    console.log("Server started ");
});