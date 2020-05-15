const main = document.querySelector('.main');
const scoreElem = document.getElementById('score');
const levelElem = document.getElementById('level');

let playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];




const figures = {
  O: [
    [1, 1],
    [1, 1]
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ]
}


let activeTetro = {
  x: 3,
  y: 0,
  shape: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ]
};

let score = 0;
let currenLevel = 1;

let possibleLevels = {
  1: {
    scorePerLine: 10,
    speed: 400,
    nextLevelScore: 100
  },
  2: {
    scorePerLine: 15,
    speed: 300,
    nextLevelScore: 200
  },
  3: {
    scorePerLine: 20,
    speed: 200,
    nextLevelScore: 400
  },
  4: {
    scorePerLine: 30,
    speed: 100,
    nextLevelScore: 800
  },
  5: {
    scorePerLine: 50,
    speed: 50,
    nextLevelScore: Infinity
  },
}

function draw() {
  let mainInnerHTML = '';

  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        mainInnerHTML += '<div class="cell movingCell"></div>';
      } else if (playfield[y][x] === 2) {
        mainInnerHTML += '<div class="cell fixedCell"></div>';
      } else {
        mainInnerHTML += '<div class="cell"></div>';
      }

    }
  }

  main.innerHTML = mainInnerHTML;
}

function removePrevActiveTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) playfield[y][x] = 0;
    }
  }
}

function addActiveTetro() {
  removePrevActiveTetro();
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (activeTetro.shape[y][x] === 1) {
        playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
      }
    }
  }
}

function rotateTetro() {
  const prevTetroState = activeTetro.shape;
  activeTetro.shape = activeTetro.shape[0].map((val, index) => activeTetro.shape.map(row => row[index]).reverse());

  if (hasCollisions()) {
    activeTetro.shape = prevTetroState;
  }
}

function hasCollisions() {
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (
        activeTetro.shape[y][x] &&
        (playfield[activeTetro.y + y] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

// проверяем заполненые линии
function removeFullLines() {
  let addScore = possibleLevels[currenLevel].scorePerLine
  let filledLines = 0;

  for (let y = 0; y < playfield.length; y++) {
    let canRemove = true;

    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] !== 2) {
        canRemove = false;
        break;
      }
    }

    if (canRemove) {
      playfield.splice(y, 1);
      playfield.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      filledLines++;
    }
  }

  switch (filledLines) {
    case 1:
      score += addScore;
      break;
    case 2:
      score += addScore * 3;
      break;
    case 3:
      score += addScore * 6;
      break;
    case 4:
      score += addScore * 12;
      break;
  }

  scoreElem.textContent = score;
  if (score >= possibleLevels[currenLevel].nextLevelScore) {
    currenLevel++;
    levelElem.textContent = currenLevel;
  }

}

function getNewTetro() {
  const possibleFigures = 'IOLJTSZ';
  const rand = Math.floor(Math.random() * possibleFigures.length);
  return figures[possibleFigures[rand]];
}

// фиксируем фигурку
function fixTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }

}

function moveTetroDown() {
  activeTetro.y++;
  if (hasCollisions()) {
    activeTetro.y--;
    fixTetro();
    removeFullLines();
    activeTetro.shape = getNewTetro();
    activeTetro.x = Math.floor((playfield[0].length - activeTetro.shape[0].length) / 2);
    activeTetro.y = 0;
  }
}

document.addEventListener('keydown', e => {
  if (e.keyCode === 37) {
    // Двигаем фигурку влево при нажатии влево
    activeTetro.x--;
    if (hasCollisions()) {
      activeTetro.x++;
    }
  } else if (e.keyCode === 39) {
    // Двигаем фигурку вправо при нажатии вправо
    activeTetro.x++;
    if (hasCollisions()) {
      activeTetro.x--;
    }
  } else if (e.keyCode === 40) {
    // Ускоряем фигурку при нажатии вниз
    moveTetroDown();
  } else if (e.keyCode === 38) {
    // Вращаем фигуру при нажатии вверх
    rotateTetro();
  }
  addActiveTetro();
  draw();
});

scoreElem.textContent = score;
levelElem.textContent = currenLevel;
addActiveTetro();
draw();

function startGame() {
  moveTetroDown();
  addActiveTetro();
  draw();
  setTimeout(startGame, possibleLevels[currenLevel].speed)
}

setTimeout(startGame, possibleLevels[currenLevel].speed);