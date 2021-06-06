const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser : true, useUnifiedTopology: true });
const dbName = 'agrigrowth';

var myobj = new Object;
var db;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var LoginInfo = new mongoose.Schema({
 login: String,
 password: String
});

var User = mongoose.model("User", LoginInfo);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.post("/login", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(3000, function() {
  console.log("Server started. ");
});
