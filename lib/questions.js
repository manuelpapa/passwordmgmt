const fs = require("fs").promises;

const inquirer = require("inquirer");

const CHOICE_GET = "Get a password";
const CHOICE_SET = "Set a password";
const questionsStart = [
  {
    type: "password",
    name: "password",
    message: "What's your master password?",
  },
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [CHOICE_GET, CHOICE_SET],
  },
];

const questionsGet = [
  {
    type: "input",
    name: "key",
    message: "Which password to get?",
  },
];
const questionsSet = [
  {
    type: "input",
    name: "key",
    message: "Which password to set?",
  },
  {
    type: "password",
    name: "password",
    message: "Please enter password",
  },
];

function askStartQuestions() {
  return inquirer.prompt(questionsStart);
}
function askPasswordQuestions() {
  return inquirer.prompt(questionsGet);
}
function askSetPasswordQuestions() {
  return inquirer.prompt(questionsSet);
}

exports.askStartQuestions = askStartQuestions;
exports.askPasswordQuestions = askPasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;

exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;
