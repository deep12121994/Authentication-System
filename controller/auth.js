const nodemailer = require("nodemailer");
const User = require("../model/users.model");
const jwt = require("jsonwebtoken");


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d9db13c140c062",
      pass: "98b65596db9f1f"
    }
  });

exports.signup = (req, res) =>{
    const {name,email,password} = req.body;

    User.findOnne({email}).exec((err, usere)=>{
        if(err){
            return res.status(401).json({error:"something went wrong!!"});
        }

        if(user) { 
            return res.status(400).json({error:"Email already exists!!"});
        }

        const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_aCTIVATION, {expiresIn:"10s"});
    });
} 