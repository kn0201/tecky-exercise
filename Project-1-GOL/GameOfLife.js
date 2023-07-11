const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let BgColor = "255";
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let widthValue = document.getElementById("fwidth");
let heightValue = document.getElementById("fheight");
let penColor = penColorInput.value;

function changePenColor(event) {
  penColor = event.target.value;
}

function setup() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth - 50, windowHeight - 340);
  canvas.parent(document.querySelector("#canvas"));

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

  // updateFramerate();
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
  background(255);
  generate();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (currentBoard[x][y] == 1) {
        fill(penColor);
      } else {
        fill(BgColor + "55");
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
      if (currentBoard[x][y] == 1 && neighbors < 2) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > 3) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == 3) {
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
  resizeCanvas(windowWidth - 50, windowHeight - 320);
  setup();
  init();
  draw();
}

document.querySelector("#reset").addEventListener("click", function () {
  init();
});

let checker = 0;
document.querySelector("#stop").addEventListener("click", function () {
  if ((checker = 0)) {
    noLoop();
    checker = 1;
  } else if (checker != 0) {
    loop();
  }
});

document.querySelector("#start").addEventListener("click", function () {
  resizeCanvas(widthValue.value, heightValue.value);
  setup();
  init();
  draw();
});
