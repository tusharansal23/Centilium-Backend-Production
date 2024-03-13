// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const express = require('express');
const { NlpManager } = require("node-nlp");
const dotenv = require('dotenv');
console.log("Starting Chatbot ...");
// Creating new Instance of NlpManager class.
dotenv.config();
const manager = new NlpManager({ languages: ["en"] });
// Loading our saved model
manager.load();
const app = express();
app.use(express.json());
// Loading a module readline, this will be able to take input from the terminal.
// var readline = require("readline");
// var rl = readline.createInterface(process.stdin, process.stdout);
// console.log("Chatbot started!");
// rl.setPrompt("> ");
// rl.prompt();
// rl.on("line", async function (line) {
//     // Here Passing our input text to the manager to get response and display response answer.
//     const response = await manager.process("en", line);
//     console.log(response.answer);
//     rl.prompt();
// }).on("close", function () {
//     process.exit(0);
// });
app.post("/ask", async (req, res) => {
    const { question } = req.body;
    console.log(req.body,question);

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }
  
    try {
      const response = await manager.process("en", question);
      res.json({ answer: response.answer });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  module.exports = app;