const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
var mongoose = require("mongoose");

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

var signIn = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cnfpassword: String,
  phoneNo: Number,
  landInfo: [{
    address: String,
    landmark: String,
    pincode: Number,
    district: String,
    state: String,
    sizeOfLand: Number,
    sizeOfLandUnit: String,
    waterSource: String,
    infoAboutCrop: String
  }]  
});

var User = mongoose.model("User", signIn);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.post("/signUp", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get("/login", (req, res) => {
  //var myData = new User(req.body);
  let email = req.body.email;
  let password = req.body.password;

  MongoClient.connect(url, { useNewUrlParser : true, useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("agrigrowth");
  dbo.collection("signIn").find({}).toArray(function(err, result) {
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
