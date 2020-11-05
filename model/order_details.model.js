const mongoose = require('mongoose');

var OrderDetailsSchema = new mongoose.Schema({
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
    Amount:{
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    Total_Amount: {
        type: Number,
        required: true,
    },
    Discount:{
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now()
    },
}, {
    versionKey: false,
    collection: "orderdetails"
});

mongoose.model("orderdetails",OrderDetailsSchema);