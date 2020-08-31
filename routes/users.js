const express = require("express");
const router = express.Router();

require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

function createUserRouter(database) {
  const collection = database.collection("users");
  router.use("/", (request, response) => {
    response.send("We're on!");
  });

  router.post("/:name", async (request, response) => {
    const username = "manuel";
    const password = "123";

    if (username === "manuel" && password === "123") {
      try {
        console.log(`Request /api/users/${request.params.name}`);
        const user = await collection.findOne({
          username: request.params.name,
        });
        response.json(user);
      } catch (error) {
        console.error("Something went wrong!", error);
        response.status(500).send(error.message);
      }
    } else {
      console.log("Password or username incorrect");
      response.send("Password and username incorrect");
    }
  });
  return router;
}

module.exports = createUserRouter;
