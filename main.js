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

const positions = {
  x: 0,
  y: 0,
};

const getRandomTetromino = () => {
  return TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
};

let currentTetromino = getRandomTetromino();

const gameBoard = Array.from({ length: ROWS }).map(() =>
  new Array(COLUMNS).fill(0)
);

// const getFilledArray = () => {

//   if (positions.y == ROWS - 1) {
//     let indexY = positions.y;
//     for (let i = 0; i < tetromino.shape.length; i++) {
//       let indexX = positions.x;
//       for (let j = 0; j < tetromino.shape[i].length; j++) {
//         array[indexY][indexX] = tetromino.shape[i][j];
//         indexX++;
//       }
//       indexY++;
//     }
//   }
//   return filledArea;
// };

const render = () => {
  let displayArea = "";

  for (let y = 0; y < ROWS; y++) {
    let row = "";
    for (let x = 0; x < COLUMNS; x++) {
      if (gameBoard[y][x] === 1) {
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
  // if (positions.y == ROWS - 1) {
  //   currentFilledArea = area.innerHTML;
  //   return;
  render();
  positions.y += 1;
  // } else {
};

setInterval(goDown, 1000);
