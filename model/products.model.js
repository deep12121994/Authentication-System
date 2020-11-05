const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

var ProductsSchema = new mongoose.Schema({
    Pro_Id : {
        type: Number,
        required: true,
    },
    Brand : {
        type: String,
        required: true,
        trim: true,
    },
    Product_Name : {
        type: String,
        required: true,
        trim: true,
    },
    Product_Weight : {
        type: Number,
        required: true,
    }, 
    Price : {
        type: Number,
        required: true,
    },
    Discount : {
        type : Number,
        required : true,
    },
    Quantity : {
        type: Number,
        required: true,
    },
    Manuf_Date : {
        type: String,
        required: true,
    },
    Exp_Date : {
        type: String,
    },
    Date : {
        type: Date,
        default: Date.now()
    },
},{
    versionKey: false,
    collection: "products"
});


autoIncrement.initialize(mongoose.connection);
ProductsSchema.plugin(autoIncrement.plugin, {
    model: "products",
    field: "Pro_Id", 
    startAt: 1, 
    incrementBy: 1, 
});

mongoose.model("products",ProductsSchema);