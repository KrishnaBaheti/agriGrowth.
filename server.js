const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
var mongoose = require("mongoose");

var prompt = require('prompt');
prompt.start();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/agrigrowth");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser : true, useUnifiedTopology: true });
const dbName = 'agrigrowth';

var myobj = new Object;
var db;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Sign Up, User Information:
//
// var signIn = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   cnfpassword: String,
//   phoneNo: Number,
//   landInfo: [{
//     address: String,
//     landmark: String,
//     pincode: Number,
//     district: String,
//     state: String,
//     sizeOfLand: Number,
//     sizeOfLandUnit: String,
//     waterSource: String,
//     infoAboutCrop: String
//   }]
// });
// var User = mongoose.model("User", signIn);

// var Schema = mongoose.Schema;

// var userInfo = new Schema({
//   name: { type: String },
//   email: { type: String },
//   password: { type: String },
//   cnfpassword: { type: String },
//   phoneNo: { type: Number }
  // landInfo: [{
  //   address: String,
  //   landmark: String,
  //   pincode: Number,
  //   district: String,
  //   state: String,
  //   sizeOfLand: Number,
  //   sizeOfLandUnit: String,
  //   waterSource: String,
  //   infoAboutCrop: String
  // }]
// });

var userInfo = new mongoose.Schema ({ //layout of the collection
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  cnfpassword: {
    type: String
  },
  phoneNo: {
    type: Number
  }
});

var users = mongoose.model("users", userInfo);

app.get("/signUp", (req, res) => {
    var myData = new users(req.body);
    myData.save()
        .then(item => {
          console.log("User information saved to database. ");
        })
        .catch(err => {
            console.log(err);;
        });
});

app.get("/login", (req, res) => {
  //var myData = new User(req.body);
  let email = req.body.email;
  let password = req.body.password;

  MongoClient.connect(url, { useNewUrlParser : true, useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("agrigrowth");
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    for(var i=0; i < result.length; i++){
      if(result[i].email === email && result[i].password === password){
        console.log("Valid User. ");
        //your logic on validation

        break;// use break or return something to stop looping after validation
      }
    }
    db.close();
  });
 });
});


app.listen(3000, function() {
  console.log("Server started. ");
});
