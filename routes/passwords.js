const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const { readPassword, writePassword } = require("../lib/passwords");
const { decrypt, encrypt } = require("../lib/crypto");

const router = express.Router();
router.use(bodyParser.json());

function createPasswordsRouter(database, masterPassword) {
  const collection = database.collection("passwords");
  router.get("/", (request, response) => {
    response.send("We`re on passwords");
  });

  router.get("/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const { authToken } = request.cookies;
      const { username } = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log(`Allow access to ${username}`);

      const encryptedPassword = await readPassword(name, database);
      if (!encryptedPassword) {
        response.status(404).send(`Password ${name} not found`);
        return;
      }
      const decryptedPassword = decrypt(encryptedPassword, masterPassword);
      response.status(200).send(decryptedPassword);
    } catch (error) {
      console.error(error);
      console.error("Something went wrong 😑", error);
      response.status(500).send(error.message);
    }
  });

  router.post("/", async (request, response) => {
    try {
      const { name, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      await writePassword(name, encryptedPassword, database);
      response.status(201).send(`Password ${name} created`);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  return router;
}

module.exports = createPasswordsRouter;
