//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const router = express.Router();
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/infiDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userDataSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: String,
  email: String,
  phone: Number,
  address: String,
  services: String,
  budget: Number,
});

const User = mongoose.model("User", userDataSchema);

app.get("/d", function (req, res) {
  res.redirect("database");
});

app.get("/get-data", function (req, res) {
  User.find(function (users) {
    res.render("database");
  });
});

app.post("/query", function (req, res) {
  const user = new User({
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    services: req.body.services,
    budget: req.body.budget,
  });

  user.save();
  res.redirect("/Message");

  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log(users);
    }
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/Services", function (req, res) {
  res.sendFile(__dirname + "/Services.html");
});

app.get("/query", function (req, res) {
  res.sendFile(__dirname + "/query.html");
});

app.get("/new", function (req, res) {
  res.sendFile(__dirname + "/Services.html");
});

app.get("/qform", function (req, res) {
  res.sendFile(__dirname + "/Query.html");
});
app.get("/Message", function (req, res) {
  res.sendFile(__dirname + "/Message.html");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// //jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const router = express.Router();
// const app = express();
// // const routes = require("./routes/index");
// app.set("view engine", "ejs");

// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect("mongodb://localhost:27017/infiDB", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// const Schema = mongoose.Schema;
// const userDataSchema = new Schema(
//   {
//     first_name: { type: String, required: true },
//     last_name: String,
//     email: String,
//     phone: Number,
//     address: String,
//     services: String,
//     budget: Number,
//     message: String,
//   },
//   { collection: "user-data" }
// );

// const UserData = mongoose.model("UserData", userDataSchema);
// /* GET home page. */
// router.get("/DB", function (req, res, next) {
//   res.render(__dirname + "/database.ejs");
// });

// router.get("/get-data", function (req, res, next) {
//   UserData.find().then(function (doc) {
//     res.render(__dirname + "/Query.html", { items: doc });
//   });
// });

// router.post("/query", function (req, res, next) {
//   const item = {
//     first_name: req.body.fname,
//     last_name: req.body.lname,
//     email: req.body.email,
//     phone: req.body.phone,
//     address: req.body.address,
//     services: req.body.services,
//     budget: req.body.budget,
//     message: req.body.messages,
//   };

//   const data = new UserData(item);
//   data.save();
//   console.log(data);
//   res.redirect(__dirname + "/Query.html");
// });
