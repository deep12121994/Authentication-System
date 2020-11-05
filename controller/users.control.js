const mongoose = require("mongoose");
const userModel = mongoose.model("users");

exports.user_Registration = (req, res) => {
    console.log("registration Post Method Call");
    console.log(req.body.email);

    userModel.findOne({ Email: req.body.Email }, (err,user) => {
        if (user) {
          return res.status(400).json({ Email: "Email already exists" });
        } 
        else 
        {
            console.log(req.body);
            var mo_Users = new userModel();
            mo_Users.First_Name = req.body.First_Name;
            mo_Users.Last_Name = req.body.Last_Name;
            mo_Users.DOB = req.body.DOB;
            mo_Users.Email = req.body.Email;
            mo_Users.Phone = req.body.Phone;
            mo_Users.Password = req.body.Password;
         
            mo_Users.save((err, doc) => {
                if(!err)
                {
                    res.redirect("/user/user_List");
                }else{
                    res.send("error occured");
                }
            });
        }
    });
};

exports.login =  (req, res) => {

    console.log("login Post Method Call");
    console.log(req.body.Email);
    console.log(req.body.Password);
    userModel.findOne({Email: req.body.Email, Password: req.body.Password}, (err, user) => {
        if(err){
            return res.status(500).send();
        }

        if(!user)
        {
            return res.status(404).send({message : " login fail!" });
        }
        
        return res.status(200).send( {message : "Successful login!" });
    })
        
};

exports.find_User =  (req,res) => {
    userModel.find({Email : {$regex: ".*" + req.body.Email + ".*" }}, (err,docs) => {
        if(!err)
        { 
            console.log(docs);
            res.render("list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean();
};

exports.update_User = (req, res) => {

    var v_Users = {
        First_Name : req.body.First_Name,
        Last_Name : req.body.Last_Name,
        DOB : req.body.DOB,
        Phone : req.body.Phone,
        Password : req.body.Password
    };

    userModel.updateOne({Email:req.body.Email}, v_Users, (err, user) => {
        if(err) {
            res.send("Error");
        }else{
            res.status(200).send({message : "User updated successfully"});
        }
    });
 };
 

exports.user_List =  (req,res) => {
    userModel.find((err,docs) => {
        if(!err)
        {
            console.log(docs);
            res.render("list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean()
};

exports.remove_User = (req, res) => {
    userModel.deleteOne({Email: req.body.Email}, (err, user) => {
        if(err) {
            res.send("Error");
        }else{
            res.status(200).send({message : "User deleted successfully"});
        }
    });
};

