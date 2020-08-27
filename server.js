// require("dotenv").config();
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.MONGO_URL);
app.listen(3000, function () {
  console.log("Listeining on 3000");
});
app.get(`/`, function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
