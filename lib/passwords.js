const { encrypt } = require("./crypto");

const fs = require("fs").promises;

async function readPasswords() {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

async function writePasswords(passwords) {
  const newPasswordsJSON = JSON.stringify(passwords, null, 2);
  fs.writeFile("./passwords.json", newPasswordsJSON);
}

async function readPassword(key) {
  const passwords = await readPasswords();
  const encryptedPassword = passwords[key];
  const decryptedPassword = decrypt(encryptedPassword, masterPassword);
  return password;
}

async function writePassword(key, decryptedPassword, masterPassword) {
  const passwords = await readPasswords();
  passwords[key] = encrypt(decryptedPassword, masterPassword);
  await writePasswords(passwords);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
