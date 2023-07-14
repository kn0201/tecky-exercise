const prompt = require("prompt-sync")();

function GuessTheNumber() {
  const random = Math.floor(Math.random() * 10) + 1;

  let number = parseInt(prompt("Guess a number from 1 to 10: "));
  let i = 0;

  while (number !== random) {
    if (number < random) {
      console.log("The number is larger");
    } else if (number > random) {
      console.log("The number is smaller");
    }

    number = parseInt(prompt("Guess a number from 1 to 10: "));

    i++;

    if (i > 1 && number !== random) {
      console.log("You lose the game");
      break;
    }
  }

  if (number == random) {
    console.log("You guessed the correct number.");
  }
}

GuessTheNumber();
