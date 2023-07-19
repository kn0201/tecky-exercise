import readline from "readline";
// import fs from "fs";
// import papa from "papaparse";

// 001
setTimeout(function () {
  // Logic here
}, 1000);

// 002
const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLineInterface.question("What is your name?", (answer: string) => {
  console.log(`Your name is ${answer}`);
  readLineInterface.close();
});

// 003
async function npmInstall() {
  try {
    console.log("npm install papaparse @types/papaparse");
  } catch (err) {
    console.log(err);
  }
}
npmInstall();

// 004
// const file = fs.createReadStream("anycsv.csv");
// papa.parse(file, {
//   worker: true, // Don't bog down the main thread if its a big file
//   complete: function (results, file) {
//     console.log(results);
//   },
// });
