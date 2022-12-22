const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#start');
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

function peep() {
  const time = randomTime(300, 1200);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    } else {
      alert(`Time UP! Your score is ${score}.
      
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
  peep();
  setTimeout(() => (timeUp = true), 20000);
}

moles.forEach((mole) => mole.addEventListener('click', bonk));
startBtn.addEventListener('click', () => {
  if (timeUp) {
    startGame();
  }
});
