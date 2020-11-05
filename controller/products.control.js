const mongoose = require("mongoose");
const productModel = mongoose.model("products");

exports.product_Registration = (req, res) => {

    productModel.findOne({Brand: req.body.Brand, Product_Name: req.body.Product_Name}, (err, product) => {
        if(err){
            return res.status(500).send();
        }

        if(!product)
        {
            console.log(req.body);
            var mo_Product = new productModel();
            mo_Product.Brand = req.body.Brand;
            mo_Product.Product_Name = req.body.Product_Name;
            mo_Product.Product_Weight = req.body.Product_Weight;
            mo_Product.Price = req.body.Price;
            mo_Product.Discount = req.body.Discount;
            mo_Product.Quantity = req.body.Quantity;
            mo_Product.Manuf_Date = req.body.Manuf_Date;
            mo_Product.Exp_Date = req.body.Exp_Date;
            mo_Product.save((err, doc) => {
                if(!err)
                {
                    res.redirect("/product/product_list");
                }else{
                    res.send("Error Occured");
                }
            });
        }
        else{
            return res.status(200).send("Product already exist");
        }
    });
};

exports.product_List =  (req,res) => {

    productModel.find((err,docs) => {
        if(!err)
        {
            console.log(docs);
            res.render("product_list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean()
};

exports.find_Product =  (req,res) => {
    productModel.find({Product_Name : {$regex: ".*" + req.body.Product_Name + ".*" }}, (err,docs) => {
        if(!err)
        { 
            console.log(docs);
            res.render("product_list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean();
};

exports.update_Product = (req, res) => {

    var v_Product = {
        Product_Weight : req.body.Product_Weight,
        Price : req.body.Price,
        Discount : req.body.Discount,
        Quantity : req.body.Quantity,
        Manuf_Date : req.body.Manuf_Date,
        Exp_Date : req.body.Exp_Date,
    };

    productModel.updateOne({Brand:req.body.Brand, Product_Name : req.body.Product_Name}, v_Product, (err, product) => {
        if(err) {
            res.send("Error");
        }else{
            res.status(200).send({message : "Product updated successfully"});
        }
    });
 };
 

exports.remove_Product = (req, res) => {
    productModel.deleteOne({Brand:req.body.Brand, Product_Name: req.body.Product_Name}, (err, product) => {
        if(err) {
            res.send("Error");
        }else{
            if(product.deletedCount>0){
                res.status(200).send({message : "Product deleted successfully"});
            }else{
                res.status(400).send({message : "Product not found"});
            }
        }
    });
};