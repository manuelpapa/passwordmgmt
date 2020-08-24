const inquirer = require("inquirer");

const fs = require("fs");
const { async } = require("rxjs");
function getPassword(password) {
  try {
    const data = fs.readFileSync("./passwords.json", "utf8");
    const yourPassword = JSON.parse(data);
    // console.log(yourPassword[password]);
    //   console.log(data);
    return yourPassword[password];
  } catch (err) {
    console.error(err);
  }
}

const questions = [
  {
    type: "input",
    name: "username",
    message: "What's your username?",
  },
  {
    type: "password",
    name: "password",
    message: "What's your password?",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123" && answers.username === "papa") {
    console.log(
      `Hi ${answers[`username`]}, your needed password for ${answers.key} is: 
      ${await getPassword(answers.key)}.`
    );
  } else console.log("Your password or username is wrong");
});
