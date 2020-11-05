const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Authentication", {  
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    }, (err)=>{

    if(!err)
    {
        console.log("success");
    }
    else{
        console.log("error");
    }
});

const User = require("./users.model");
const Product = require("./products.model");
const Order_Details = require("./orders.model");
const Vendor = require("./vendors.model");