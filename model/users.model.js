var mongoose = require('mongoose');;
const crypto = require("crypto")
const autoIncrement = require("mongoose-auto-increment");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var UsersSchema = new mongoose.Schema({
    First_Name : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        max: 25,
    },
    Last_Name : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        max: 25,
    },
    Email : {
        type: String,
        required: [true,"add email"],
        unique: [true],
        lowercase: true,
    },
    Phone : {
        type: String,
        required: true,
        trim: true,
    },
    hashed_Password : {
        type: String,
        required: true,
    },
    salt:{
        type: String,
        required: true,
    },
    Role:{
        type: String,
        default: "Subscriber"
    },
    ResetPasswordLink:{
        data:String,
        default:""
    },
   
},{
    versionKey: false,
    collection: "users"
},{timestamps: true});

autoIncrement.initialize(mongoose.connection);
UsersSchema.plugin(autoIncrement.plugin, {
    model: "users",
    field: "Emp_Id", 
    startAt: 1, 
    incrementBy: 1, 
});

UsersSchema.methods = {
    makeSalt: function () {
      return Math.round(new Date().valueOf() * Math.random() + "")
    },
    encryptPassword: function (password) {
      if (!password) return "";
  
      try {
        return crypto
          .createHmac("sha1", this.salt)  //generate a key
          .update(password)
          .digest("hex");
      } catch (err) {
        return err;
      }
    },
    authenticate: function (password) {
      return this.encryptPassword(password)===this.hashed_password
    }
  }
  
  UsersSchema.virtual("password")
    .set(function (password) {

      this._password = password;  // temporary variable called password
      this.salt = this.makeSalt();  // generate salt and save it in our database
      this.hashed_password = this.encryptPassword(password); //encrypt the password and saved password 
    })
    .get(function () {
      return this._password;  // return data only not saved  
    });
  
mongoose.model("users",UsersSchema);