require("dotenv").config();

const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  askForNewMasterPassword,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./lib/passwords");
const { encrypt, decrypt, createHash, verifyHash } = require("./lib/crypto");
const { MongoClient } = require("mongodb");

// const uri =
//   "mongodb+srv://manuelpapa:tsu4mage@development.40txb.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(process.env.MONGO_URI);

async function main() {
  try {
    await client.connect();
    const database = client.db(process.MONGO_DB_NAME);

    const originalMasterPassword = await readMasterPassword();

    if (!originalMasterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      const hashMasterPassword = await createHash(newMasterPassword);
      await writeMasterPassword(hashMasterPassword);
      console.log("Master password set!");
      return;
    }

    const { masterPassword, action } = await askStartQuestions();
    const comparedPassword = await verifyHash(
      masterPassword,
      originalMasterPassword
    );
    if (!comparedPassword) {
      console.log("Master password is incorrect!");
      return;
    }

    console.log("Master password is correct!");
    if (action === CHOICE_GET) {
      console.log("Now Get a password");
      const { key } = await askGetPasswordQuestions();
      try {
        const encryptedPassword = await readPassword(key, database);
        const password = decrypt(encryptedPassword, masterPassword);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑");
        // What to do now?
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      try {
        const { key, password } = await askSetPasswordQuestions();
        const encrypedPassword = encrypt(password, masterPassword);
        await writePassword(key, encrypedPassword, database);
        console.log(`New password set`);
      } catch (error) {
        console.error("Something went wrong 😑");
      }
    }
  } finally {
    await client.close();
  }
}
main();
