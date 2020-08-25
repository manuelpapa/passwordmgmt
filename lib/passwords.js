const fs = require("fs").promises;

async function readPassword(key) {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  const password = passwords[key];
  return password;
}

async function writePassword(key, value) {
  fs.appendFile("./passwords.json", key + value);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
