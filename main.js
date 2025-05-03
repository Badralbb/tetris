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
  for (let y = 0; y < currentTetromino.shape.length; y++) {
    for (let x = 0; x < currentTetromino.shape[y].length; x++) {
      if (currentTetromino.shape[y][x] === 1) {
        const newY = position.y + y + 1;
        const newX = position.x + x;
        if (ROWS == newY || gameBoard[newY][newX] === 1) {
          for (let i = 0; i < currentTetromino.shape.length; i++) {
            for (let j = 0; j < currentTetromino.shape[i].length; j++) {
              if (currentTetromino.shape[i][j] === 1) {
                gameBoard[position.y + i][position.x + j] = 1;
              }
            }
          }

          currentTetromino = getRandomTetromino();
          position = { x: xStartIndex, y: 0 };

          return true;
        }
      }
    }
  }
  return false;
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
  if (!placeTetromino()) position.y += 1;
  render();
};

const goRight = () => {
  const shape = currentTetromino.shape;

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const newX = position.x + col + 1;
        const newY = position.y + row;

        if (newX >= COLUMNS || gameBoard[newY][newX] === 1) {
          return;
        }
      }
    }
  }

  position.x++;
};

const goLeft = () => {
  const shape = currentTetromino.shape;

  for (let row = 0; row < shape.length; row++) {
    for (let col = shape[row].length - 1; col >= 0; col--) {
      if (shape[row][col] === 1) {
        const newY = position.y + row;
        const newX = position.x + col - 1;
        if (newX < 0 || gameBoard[newY][newX] === 1) {
          return;
        }
      }
    }
  }
  position.x--;
};

const spaceKey = () => {
  position.y = ROWS - currentTetromino.shape.length;
};

const handleKeyDown = (event) => {
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
