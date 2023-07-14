let vid = document.getElementById("music");
vid.volume = 0.05;

const unitLength = 20;
const boxColor = "#CBEEF9";
let strokeColor = "#CBEEF9";

let BgColor = "255";

function playAudio() {
  vid.play();
}
function pauseAudio() {
  vid.pause();
}

let img;

function preload() {
  img = loadImage("123.jpeg");
}

let columns; /* To be determined by window width */
let rows; /* To be determined by window height */

let currentBoard;
let nextBoard;

let inputWidth = document.querySelector("#fwidth");
let inputHeight = document.querySelector("#fheight");
let newWidth = 400;
let newHeight = 400;
inputWidth.addEventListener("change", function () {
  newWidth = this.value;
  if (this.value == "") {
    newWidth = 400;
  }
  if (this.value > windowWidth) {
    alert("Input should smaller than " + windowWidth);
  }
});
inputHeight.addEventListener("change", function () {
  newHeight = this.value;
  if (this.value == "") {
    newHeight = 400;
  }
  if (this.value > windowHeight) {
    alert("Input should smaller than " + windowHeight);
  }
});

let loneliness = 2;
let overpopulation = 3;
let reproduction = 3;

let inputLoneliness = document.querySelector("#floneliness");
let inputOverpopulation = document.querySelector("#foverpopulation");
let inputReproduction = document.querySelector("#freproduction");

inputLoneliness.addEventListener("change", function () {
  loneliness = this.value;
  if (this.value == "") {
    loneliness = 2;
  }
});
inputOverpopulation.addEventListener("change", function () {
  overpopulation = this.value;
  if (this.value == "") {
    overpopulation = 3;
  }
});
inputReproduction.addEventListener("change", function () {
  reproduction = this.value;
  if (this.value == "") {
    reproduction = 3;
  }
});

let penColor = "#CBEEF9";

function changePenColor(event) {
  penColor = event.target.value;
  strokeColor = event.target.value;
}

function NewCanvas() {
  const canvas = createCanvas(windowWidth - 100, windowHeight - 350);
  canvas.parent(document.querySelector("#canvas"));
}

function setupWithoutCanvas() {
  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  speedSlider = document.querySelector("#speed-slider");
  speedSlider.addEventListener("input", updateFramerate);
  updateFramerate();

  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

function setup() {
  /* Set the canvas to be under the element #canvas*/
  NewCanvas();
  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  speedSlider = document.querySelector("#speed-slider");
  speedSlider.addEventListener("input", updateFramerate);
  updateFramerate();

  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

function init() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // currentBoard[i][j] = 0;
      currentBoard[x][y] = random() > 0.8 ? 1 : 0; // one line if
      nextBoard[x][y] = 0;
    }
  }
}

// function draw() {
//   generate();
//   for (let x = 0; x < columns; x++) {
//     for (let y = 0; y < rows; y++) {
//       if (currentBoard[x][y] == 1) {
//         image(
//           img,
//           x * unitLength,
//           y * unitLength,
//           unitLength,
//           unitLength,
//           0,
//           0
//         );
//       } else {
//         erase();
//         rect(x * unitLength, y * unitLength, unitLength, unitLength);
//         noErase();
//         noFill();
//         clear
//       }
//       stroke(strokeColor);
//       rect(x * unitLength, y * unitLength, unitLength, unitLength);
//     }
//   }
// }

function draw() {
  clear();
  generate();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (currentBoard[x][y] == 1) {
        // fill(penColor);
        image(
          img,
          x * unitLength,
          y * unitLength,
          unitLength,
          unitLength,
          0,
          0
        );
      } else {
        erase(255, 0);
        noFill();
      }
      stroke(strokeColor);
      rect(x * unitLength, y * unitLength, unitLength, unitLength);
      noErase();
    }
  }
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let dx of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
          if (dx == 0 && dy == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          let neighborsX = (x + dx + columns) % columns;
          let neighborsY = (y + dy + rows) % rows;
          neighbors += currentBoard[neighborsX][neighborsY];
        }
      }

      // Rules of Life
      if (currentBoard[x][y] == 1 && neighbors < loneliness) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > overpopulation) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == reproduction) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  // fill(boxColor);
  image(img, x * unitLength, y * unitLength, unitLength, unitLength, 0, 0);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  loop();
}

function updateFramerate() {
  const newFramerate = parseInt(speedSlider.value); // Get the value from the speed slider
  frameRate(newFramerate); // Set the new framerate
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight - 390);
  setupWithoutCanvas();
  init();
  draw();
}

document.querySelector("#reset-value").addEventListener("click", function () {
  loneliness = 2;
  overpopulation = 3;
  reproduction = 3;
  newWidth = 400;
  newHeight = 400;
  floneliness.value = "";
  foverpopulation.value = "";
  freproduction.value = "";
  fwidth.value = "";
  fheight.value = "";
});

document.querySelector("#reset").addEventListener("click", function () {
  setup();
  penColor = "#CBEEF9";
  strokeColor = "#CBEEF9";
});

let checker = 0;
document.querySelector("#stop").addEventListener("click", function () {
  noLoop();
});

document.querySelector("#resize").addEventListener("click", function () {
  resizeCanvas(newWidth, newHeight);
  setupWithoutCanvas();
});

document.querySelector("#start").addEventListener("click", function () {
  loop();
});

document.querySelector("#pausemusic").addEventListener("click", function () {
  pauseAudio();
});
document.querySelector("#playmusic").addEventListener("click", function () {
  playAudio();
});
