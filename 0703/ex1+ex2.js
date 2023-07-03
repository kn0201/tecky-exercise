let gameBoard = document.querySelector(".game-board-inner");
let ChangeTurn = document.querySelector(".current-player-turn-container");
let addCross =
  '<div class="player-x player-icon"><i class="bi bi-x-lg"></i></i></div>';
let addCircle =
  '<div class="player-o player-icon"><i class="bi bi-circle"></i></div>';
let reset = document.querySelector("#restart-game");
let box = document.querySelectorAll(".box");
let xTurn = '<div class="player-icon-x"><i class="bi bi-x-lg"></i></div>';
let oTurn = '<div class="player-icon-O"><i class="bi bi-circle"></i></div>';

// ex1
gameBoard.onclick = function (event) {
  if (
    event.target &&
    event.target.matches(".box") &&
    event.target.innerHTML === ""
  ) {
    TicTacToe();
  }
};

// // ex2

let turn = 0;
let xArray = [];
let oArray = [];

reset.onclick = function () {
  for (let key of box) {
    key.innerHTML = "";
  }

  ChangeTurn.innerHTML = xTurn + "<span>Turn</span>";
  turn = 0;
  xArray = [];
  oArray = [];
};

function TicTacToe() {
  // 0 = player-X
  // 1 = player - O
  if (turn == 0) {
    event.target.innerHTML = addCross;
    turn = 1;
    ChangeTurn.innerHTML = oTurn + "<span>Turn</span>";
    xArray.push(event.target.id);
    checkWinner(xArray);
  } else if (turn == 1) {
    event.target.innerHTML = addCircle;
    turn = 0;
    ChangeTurn.innerHTML = xTurn + "<span>Turn</span>";
    oArray.push(event.target.id);
    checkWinner(oArray);
  }
}

function checkWinner(playerArray) {
  let combos = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  for (let combo of combos) {
    console.log(combo);
    console.log(playerArray);
    if (playerArray === combo) {
      return console.log(true);
    } else {
      continue;
    }
  }
}
