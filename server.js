require("dotenv").config();

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const { readPassword } = require("./lib/passwords");
const { decrypt } = require("./lib/crypto");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const client = new MongoClient(process.env.MONGO_URI);

const port = 3000;

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  //dynamisch
  app.get("/api/passwords/wifi", async (req, res) => {
    const key = "wifi";
    const encryptedPassword = await readPassword(key, database);
    const password = decrypt(encryptedPassword, masterPassword);

    res.send(password);
  });

  //password anlegen
  app.post("/api/passwords/", (req, res) => {
    res.send("123");
  });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  app.post("/quotes", (req, res) => {
    console.log(req.body);
  });

  app.listen(port, () => {
    console.log(`Ready! App is listening on http://localhost:${port}`);
  });
}
main();

// LEONS CODE
// require("dotenv").config();

// const express = require("express");
// const { MongoClient } = require("mongodb");
// const { readPassword } = require("./lib/passwords");
// const { decrypt } = require("./lib/crypto");

// const client = new MongoClient(process.env.MONGO_URI);

// const app = express();

// const port = 3000;

// async function main() {
//   await client.connect();
//   const database = client.db(process.env.MONGO_DB_NAME);
//   const masterPassword = process.env.MASTER_PASSWORD;

//   //dynamisch
//   app.get("/api/passwords/wifi", async (req, res) => {
//     const key = "wifi";
//     const encryptedPassword = await readPassword(key, database);
//     const password = decrypt(encryptedPassword, masterPassword);

//     res.send(password);
//   });

//   //password anlegen
//   app.post("/api/passwords/", (req, res) => {
//     res.send("123");
//   });

//   app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//   });

//   app.listen(port, () => {
//     console.log(`Ready! App is listening on http://localhost:${port}`);
//   });
// }
// main();

//MEIN CODE
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// const MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient(process.env.MONGO_URL);
// app.listen(3000, function () {
//   console.log("Listeining on 3000");
// });
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// app.post("/quotes", (req, res) => {
//   console.log("Hellooooooooooooooooo!");
// });
