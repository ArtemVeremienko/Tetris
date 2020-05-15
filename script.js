const main = document.querySelector('.main');

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

let gameSpeed = 500;

let activeTetro = {
  x: 0,
  y: 0,
  shape: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ]
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
      if (playfield[y][x]) playfield[y][x] = 0;
    }
  }
}

function addActiveTetro() {
  removePrevActiveTetro();
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (activeTetro.shape[y][x]) {
        playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
      }
    }
  }
}

function hasCollisions() {
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (
        activeTetro.shape[y][x] &&
        (playfield[activeTetro.y + y] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === undefined)
      ) {
        return true;
      }
    }
  }
  return false;
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
    activeTetro.x--;
    if (hasCollisions()) {
      activeTetro.x++;
    }
  } else if (e.keyCode === 39) {
    // Двигаем фигурку вправо
    activeTetro.x++;
    if (hasCollisions()) {
      activeTetro.x--;
    }
  } else if (e.keyCode === 40) {
    // Ускоряем фигурку
    activeTetro.y++;
    if (hasCollisions()) {
      activeTetro.y--;
    }
  }
  addActiveTetro();
  draw();
});

addActiveTetro();
draw();

/*
function startGame() {
  moveTetroDown();
  draw();
  setTimeout(startGame, gameSpeed)
}

setTimeout(startGame, gameSpeed);

*/