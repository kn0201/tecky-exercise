const unitLength = 20;
const boxColor = 150;
const strokeColor = 0;

let BgColor = "255";

let vid = document.getElementById("music");
vid.volume = 0.05;

function playAudio() {
  vid.play();
}
function pauseAudio() {
  vid.pause();
}

let columns; /* To be determined by window width */
let rows; /* To be determined by window height */

let currentBoard;
let nextBoard;

let penColor = penColorInput.value;

let inputWidth = document.querySelector("#fwidth");
let inputHeight = document.querySelector("#fheight");
let newWidth = 800;
let newHeight = 800;
inputWidth.addEventListener("change", function () {
  newWidth = this.value;
  if (this.value == "") {
    newWidth = 800;
  }
  if (this.value > windowWidth) {
    alert("Input should smaller than " + windowWidth);
  }
});
inputHeight.addEventListener("change", function () {
  newHeight = this.value;
  if (this.value == "") {
    newHeight = 800;
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

function changePenColor(event) {
  penColor = event.target.value;
}

function displayImage(src, width, height) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  document.body.appendChild(img);
}

let imageCell = displayImage("Tecky/Project-1-GOL/img/yukimin.png", 20, 20);

function NewCanvas() {
  const canvas = createCanvas(windowWidth - 50, windowHeight - 380);
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

function draw() {
  // background(255);
  generate();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (currentBoard[x][y] == 1) {
        fill(penColor);
      } else {
        fill("rgba(0,0,0,0)");
      }
      stroke(strokeColor);
      rect(x * unitLength, y * unitLength, unitLength, unitLength);
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
  fill(penColor);
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
  resizeCanvas(windowWidth - 50, windowHeight - 370);
  setupWithoutCanvas();
  init();
  draw();
}

document.querySelector("#reset-value").addEventListener("click", function () {
  loneliness = 2;
  overpopulation = 3;
  reproduction = 3;
});

document.querySelector("#reset").addEventListener("click", function () {
  setup();
  // init();
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