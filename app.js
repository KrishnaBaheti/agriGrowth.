const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
// const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser : true, useUnifiedTopology: true }, { useUnifiedTopology: true });
const dbName = 'agrigrowth';

var myobj = new Object;
var db;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("agrigrowth");
  var myobj1 = { soilType: null, temperature: null, humidity: null, ph: null, rainfall: null, crop: null };
  console.log(myobj1);

  dbo.collection("SoilTestingInfo").insertOne(myobj1, function(error, res) {
          if(error) {
              console.error(error);
          }
  });

  var myobj2 = { state: null, district: null, cropYear: null, season: null, crop: null, area: null, production: null };
  console.log(myobj2);

  dbo.collection("CropInfo").insertOne(myobj2, function(error, res) {
          if(error) {
              console.error(error);
          }
  });

  var myobj3 = { email: null, password: null };
  console.log(myobj3);

  dbo.collection("LoginInfo").insertOne(myobj3, function(error, res) {
          if(error) {
              console.error(error);
          }
  });

  var myobj4 = { name: null, email: null, password: null, phoneNo: null, address: null, landmark: null, pincode: null, district: null, state: null, sizeOfLand: null, waterSource: null, infoAboutCrop: null };
  console.log(myobj4);

  dbo.collection("UserInfo").insertOne(myobj4, function(error, res) {
          if(error) {
              console.error(error);
          }
  });

  app.get("/userProfile", function(req, res) {
            console.log("User Profile Form");
      });

  app.post("/signUp", function(req, res) {
            console.log("SignUp");
      });

  app.post("/signUp2", function(req, res) {
            console.log("SignUp 2");
      });

  app.post("/soilTestingForm", function(req, res) {
            console.log("Soil Testing Form");
      });

      app.post("/login", function(req, res) {
        var mysort = { _id: 1};
        var dbo = db.db("agrigrowth");
          dbo.collection("LoginInfo").find({}).sort(mysort).toArray(function(error, result) {
              if(error) {
                  return res.status(500).send(error);
              };
              res.send(result);
          });
        });

  // app.get("/login", function(req, res) {
  //   dbo.collection("LoginInfo").find({}).toArray(function(err, result) {
  //     if (err) throw err;
  //     res.send(result);
  //   });
  // });


  db.close();
});

app.listen(3000, function() {
  console.log("Server started. ");
});
