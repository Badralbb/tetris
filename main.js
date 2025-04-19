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

let currentTetromino = getRandomTetromino();
let position = { x: Math.floor(COLUMNS / 2) - 1, y: 0 };

const gameBoard = Array.from({ length: ROWS }).map(() =>
  new Array(COLUMNS).fill(0)
);

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

      if (filled) {
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
  position.y += 1;
  render();
};

render();
setInterval(goDown, 1000);
