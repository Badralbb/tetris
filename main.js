const area = document.getElementById("tetris-area");

const COLUMNS = 10;
const ROWS = 16;

const TETROMINOS = [
  { color: "cyan", shape: [[1, 1, 1, 1]] },
  {
    color: "blue",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    color: "orange",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    color: "green",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
    ],
  },
  {
    color: "yellow",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    color: "red",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    color: "purple",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
];

const getRandomTetromino = () => {
  return TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
};

const xStartIndex = Math.floor(COLUMNS / 2) - 1;
let currentTetromino = getRandomTetromino();
let position = { x: xStartIndex, y: 0 };

const gameBoard = Array.from({ length: ROWS }).map(() =>
  new Array(COLUMNS).fill(0)
);

const placeTetromino = () => {
  if (ROWS - currentTetromino.shape.length === position.y) {
    let indexY = position.y;
    for (let y = 0; y < currentTetromino.shape.length; y++) {
      let indexX = position.x;
      for (let x = 0; x < currentTetromino.shape[y].length; x++) {
        if (currentTetromino.shape[y][x] == 1) {
          gameBoard[indexY][indexX] = 1;
        }
        indexX++;
      }
      indexY++;
    }
    currentTetromino = getRandomTetromino();
    position.x = xStartIndex;
    position.y = 0;
  }
  // for (let i = 0; i < currentTetromino.shape.length; i++) {
  //   for (let j = 0; j < currentTetromino.shape[i].length; j++) {
  //     if (currentTetromino.shape[i][j] === 1) {
  //       const newY = position.y + i + 1;
  //       const newX = position.x + j;

  //       // Check bottom or collision with board
  //       if (newY >= ROWS || gameBoard[newY][newX] === 1) {
  //         // Lock tetromino to the board
  //         for (let a = 0; a < currentTetromino.shape.length; a++) {
  //           for (let b = 0; b < currentTetromino.shape[a].length; b++) {
  //             if (currentTetromino.shape[a][b] === 1) {
  //               const lockY = position.y + a;
  //               const lockX = position.x + b;
  //               if (
  //                 lockY >= 0 &&
  //                 lockY < ROWS &&
  //                 lockX >= 0 &&
  //                 lockX < COLUMNS
  //               ) {
  //                 gameBoard[lockY][lockX] = 1; // mark as filled
  //               }
  //             }
  //           }
  //         }

  //         // Get new tetromino
  //         currentTetromino = getRandomTetromino();
  //         position = { x: Math.floor(COLUMNS / 2) - 1, y: 0 };

  //         return true; // placed
  //       }
  //     }
  //   }
  // }
  // return false; // not placed
};

const render = () => {
  let displayArea = "";

  for (let y = 0; y < ROWS; y++) {
    let row = "";
    for (let x = 0; x < COLUMNS; x++) {
      let filled = false;
      for (let i = 0; i < currentTetromino.shape.length; i++) {
        for (let j = 0; j < currentTetromino.shape[i].length; j++) {
          if (
            currentTetromino.shape[i][j] === 1 &&
            x === position.x + j &&
            y === position.y + i
          ) {
            filled = true;
          }
        }
      }

      if (filled || gameBoard[y][x] == 1) {
        row += `<div style="background-color:${currentTetromino.color}; width:40px; height:40px; border-radius:10px"></div>`;
      } else {
        row += `<div style="background-color:white; width:40px; height:40px; border-radius:10px; border:1px solid #ccc;"></div>`;
      }
    }
    displayArea += `<div style="display:flex">${row}</div>`;
  }

  area.innerHTML = displayArea;
};

const goDown = () => {
  const placed = placeTetromino();
  if (!placed) position.y += 1;
  render();
};

const goRight = () => {
  position.x++;
};

const goLeft = () => {
  position.x--;
};

const spaceKey = () => {
  position.y = ROWS - currentTetromino.shape.length;
};

const handleKeyDown = (event) => {
  console.log(event.key);
  switch (event.key) {
    case "ArrowLeft":
      goLeft();
      break;
    case "ArrowRight":
      goRight();
      break;
    case "ArrowDown":
      goDown();
      break;
    case " ":
      spaceKey();
  }
  render();
};

render();
setInterval(goDown, 500);
