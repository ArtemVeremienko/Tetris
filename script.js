const main = document.querySelector('.main');

let playfield = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 2, 2, 0, 0]
];

let gameSpeed = 500;

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

function canTetroMoveDown() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (y == playfield.length - 1 || playfield[y + 1][x] == 2) return false;
      }
    }
  }

  return true;
}

function moveTetroDown() {
  if (canTetroMoveDown()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          playfield[y + 1][x] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  } else {
    fixTetro();
  }
}

// Двигаем фигурку влево
function canTetroMoveLeft() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === 0 || playfield[y][x - 1] === 2) return false;
      }
    }
  }

  return true;
}

function moveTetroLeft() {
  if (canTetroMoveLeft()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          playfield[y][x - 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
}

// Двигаем фигурку вправо
function canTetroMoveRigth() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === playfield[0].length - 1 || playfield[y][x + 1] === 2) return false;
      }
    }
  }

  return true;
}

function moveTetroRight() {
  if (canTetroMoveRigth()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = playfield[y].length - 1; x >= 0; x--) {
        if (playfield[y][x] === 1) {
          playfield[y][x + 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
}

// проверяем заполненые линии
function removeFullLines() {
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
      playfield.unshift(playfield[0]);
    }
  }
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

  removeFullLines();

  playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
  playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
}

document.addEventListener('keydown', e => {
  if (e.keyCode === 37) {
    // Двигаем фигурку влево
    moveTetroLeft();
  } else if (e.keyCode === 39) {
    // Двигаем фигурку вправо
    moveTetroRight();
  } else if (e.keyCode === 40) {
    // Ускоряем фигурку
    moveTetroDown();
  }

  draw();
});

draw();

function startGame() {
  moveTetroDown();
  draw();
  setTimeout(startGame, gameSpeed)
}

setTimeout(startGame, gameSpeed);


