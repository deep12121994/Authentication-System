const mongoose = require("mongoose");
const vendorModel = mongoose.model("vendors");

exports.vendor_Registration = (req, res) => {

    vendorModel.findOne({Company_Name: req.body.Company_Name}, (err, vendor) => {
        if(err){
            return res.status(500).send();
        }

        if(!vendor)
        {
            console.log(req.body);
            var mo_Vendor = new vendorModel();
            mo_Vendor.Company_Name = req.body.Company_Name;
            mo_Vendor.Contact_Person = req.body.Contact_Person;
            mo_Vendor.Contact_Number = req.body.Contact_Number;
            mo_Vendor.save((err, doc) => {
                if(!err)
                {
                    res.redirect("/vendor/vendor_list");
                }else{
                    res.send("Error Occured");
                }
            });
        }
        else{
            return res.status(200).send("Vendor already exist");
        }
    });
};

exports.vendor_List =  (req,res) => {

    vendorModel.find((err,docs) => {
        if(!err)
        {
            console.log(docs);
            res.render("vendor_list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean()
};

exports.find_Vendor =  (req,res) => {
    vendorModel.find({Company_Name: {$regex: ".*" + req.body.Company_Name + ".*" }}, (err,docs) => {
        if(!err)
        { 
            console.log(docs);
            res.render("vendor_list", {data : docs});
        }else{
            console.log(req.body.Company_Name);
            res.send("Vendor does not exist");
        }
    }).lean();
};


exports.update_Vendor = (req, res) => {

    var v_Vendor = {
        Contact_Person : req.body.Contact_Person,
        Contact_Number : req.body.Contact_Number
    }

    vendorModel.updateOne({Company_Name : req.body.Company_Name}, v_Vendor, (err, vendor) => {
        if(err) {
            res.send("Error");
        }else{
            res.status(200).send({message : "Vendor updated successfully"});
        }
    });
 };

 exports.remove_Vendor = (req, res) => {
    vendorModel.deleteOne({Company_Name : req.body.Company_Name}, (err, vendor) => {
        if(err) {
            res.send("Error");
        }else{
            if(vendor.deletedCount>0){
                res.status(200).send({message : "Vendor deleted successfully"});
            }else{
                res.status(400).send({message : "Vendor not found"});
            }
        }
    });
};