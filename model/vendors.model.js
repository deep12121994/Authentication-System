const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

var VendorsSchema = new mongoose.Schema({
    Vendor_Id:{
        type: Number,
        required: true,
        trim: true,
    },
    Company_Name : {
        type: String,
        required: true,
        trim: true,
    },
    Contact_Person : {
        type: String,
        required: true,
        trim: true,
    },
    Contact_Number : {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now()
    },
}, {
    versionKey: false,
    collection: "vendors"
});


autoIncrement.initialize(mongoose.connection);
VendorsSchema.plugin(autoIncrement.plugin, {
    model: "vendors",
    field: "Vendor_Id", 
    startAt: 1, 
    incrementBy: 1, 
});

mongoose.model("vendors",VendorsSchema);