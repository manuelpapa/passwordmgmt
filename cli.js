const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterPassword,
} = require("./lib/passwords");
const { encrypt, decrypt } = require("./lib/crypto");

async function main() {
  const { masterPassword, action } = await askStartQuestions();
  const originalMasterPassword = await readMasterPassword;
  if (masterPassword !== originalMasterPassword) {
    console.log("Master password is incorrect!");
    if (action === CHOICE_GET) {
      console.log("Now Get a password");
      const { key } = await askGetPasswordQuestions();
      try {
        const encryptedPassword = await readPassword(key);
        const password = decrypt(encryptedPassword, masterPassword);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑");
        // What to do now?
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      const encrypedPassword = encrypt(password, masterPassword);
      await writePassword(key, encrypedPassword);
      console.log(`New password set`);
    }
  }
}

main();
