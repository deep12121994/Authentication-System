const mongoose = require("mongoose");
const orderModel = mongoose.model("orders");
const orderDetailsModel = mongoose.model("orderdetails");

exports.order_Registration = (req, res) => {

    orderModel.findOne({Order_Id: req.body.Order_Id}, (err, order) => {
        if(err){
            return res.status(500).send();
        }

        if(!order)
        {
            console.log(req.body);
            var mo_Order = new orderModel();
            mo_Order.Order_Id = req.body.Order_Id;
            mo_Order.Customer_Name = req.body.Customer_Name;
            mo_Order.Customer_Number = req.body.Customer_Number;
            mo_Order.Order_Type = req.body.Order_Type;
            mo_Order.Quantity = req.body.Quantity;
            mo_Order.Total_Amount = req.body.Total_Amount;
            mo_Order.Paid = req.body.Paid;
            mo_Order.Paid_Amount = req.body.Paid_Amount;
            mo_Order.Discount = req.body.Discount;
            mo_Order.save((err, doc) => {
                if(!err)
                {
                    res.redirect("/order/order_list");
                }else{
                    console.log(err);
                    res.send("Error Occured");
                }
            });
        }
        else{
            return res.status(200).send("Order already exist");
        }
    });
};

exports.order_List =  (req,res) => {

    orderModel.find((err,docs) => {
        if(!err)
        {
            console.log(docs);
            res.render("order_list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean();
};

exports.update_Order = (req, res) => {

    var v_Orders = {
        Order_Id : req.body.Order_Id,
        Customer_Name  : req.body.Customer_Name ,
        Customer_Number : req.body.Customer_Number,
        Order_Type : req.body.Order_Type,
        Quantity : req.body.Quantity,
        Total_Amount : req.body.Total_Amount,
        Total : req.body.Total,
        Paid : req.body.Paid,
        Paid_Amount : req.body.Paid_Amount,
        Discount : req.body.Discount
    };

    orderModel.updateOne({Order_Id : req.body.Order_Id}, v_Orders, (err, order) => {
        if(err) {
            res.send("Error");
        }else{
            res.status(200).send({message : "Order updated successfully"});
        }
    });
 };

exports.find_Order =  (req,res) => {
    orderModel.find({Order_Id : {$regex: ".*" + req.body.Order_Id + ".*" }}, (err,docs) => {
        if(!err)
        { 
            console.log(docs);
            res.render("order_list", {data : docs});
        }else{
            res.send("Order does not exist");
        }
    }).lean();
};

exports.remove_Order = (req, res) => {
    orderModel.deleteOne({Order_Id: req.body.Order_Id}, (err, order) => {
        if(err) {
            res.send("Error");
        }else{
            if(order.deletedCount>0){
                res.status(200).send({message : "Order deleted successfully"});
            }else{
                res.status(400).send({message : "Order not found"});
            }
        }
    });
};

exports.orderDetails_Registration = (req, res) => {

    orderModel.findOne({Order_Id: req.body.Order_Id}, (err, order) => {
        if(err){
            return res.status(500).send();
        }

        if(!order)
        {
            console.log(req.body);
            var mo_Order = new orderModel();
            mo_Order.Order_Id = req.body.Order_Id;
            mo_Order.Customer_Name = req.body.Customer_Name;
            mo_Order.Customer_Number = req.body.Customer_Number;
            mo_Order.Order_Type = req.body.Order_Type;
            mo_Order.Quantity = req.body.Quantity;
            mo_Order.Total_Amount = req.body.Total_Amount;
            mo_Order.Paid = req.body.Paid;
            mo_Order.Paid_Amount = req.body.Paid_Amount;
            mo_Order.Discount = req.body.Discount;
            //console.log(req.body.Order_Details.length);
            var Order_Info = [];
            for(var i=0; i<req.body.Order_Details.length; i++)
            {
                var mo_OrderDetails = new orderDetailsModel();
                console.log(req.body.Order_Details[i].Brand);
                mo_OrderDetails.Brand = req.body.Order_Details[i].Brand;
                mo_OrderDetails.Product_Name = req.body.Order_Details[i].Product_Name;
                mo_OrderDetails.Amount = req.body.Order_Details[i].Amount;
                mo_OrderDetails.Quantity = req.body.Order_Details[i].Quantity;
                mo_OrderDetails.Total_Amount = req.body.Order_Details[i].Total_Amount;
                mo_OrderDetails.Discount = req.body.Order_Details[i].Discount;
                Order_Info.push(mo_OrderDetails);
            }
            mo_Order.Order_Details = Order_Info;
            mo_Order.save((err, doc) => {
                if(!err)
                {
                    res.redirect("/order/order_list");
                }else{
                    console.log(err);
                    res.send("Error Occured");
                }
            });
            //return res.status(200).send("Order already exist");
        }
        else{
            return res.status(200).send("Order already exist");
        }
    });
};