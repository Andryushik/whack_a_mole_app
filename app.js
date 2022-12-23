const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#start');
const level = document.querySelector('#select-level');
let lastHole;
let timeUp = true;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const holeId = Math.floor(Math.random() * holes.length);
  if (holes[holeId] === lastHole) {
    return randomHole(holes);
  }
  lastHole = holes[holeId];
  return holes[holeId];
}

function peep(minT, maxT) {
  const time = randomTime(minT, maxT);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep(minT, maxT);
    } else {
      alert(`Time's UP! Your score is ${score}.
      
      GAME OVER...`);
    }
  }, time);
}

function bonk(e) {
  if (!e.isTrusted) return;
  lastHole.classList.remove('up');
  score++;
  scoreBoard.textContent = score;
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  const selectedLevel = level.options[level.selectedIndex].value;

  if (selectedLevel == 3) {
    peep(100, 700);
  } else if (selectedLevel == 2) {
    peep(200, 900);
  } else {
    peep(300, 1200);
  }
  setTimeout(() => (timeUp = true), 20000);
}

moles.forEach((mole) => mole.addEventListener('click', bonk));
startBtn.addEventListener('click', () => {
  if (timeUp) {
    startGame();
  }
});
