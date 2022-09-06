`use strict`;
//Selecting Elements
let player0Elmnt = document.querySelector(`.player--0`);
let player1Elmnt = document.querySelector(`.player--1`);
let score0Elmnt = document.querySelector(`#score--0`);
let score1Elmnt = document.querySelector(`#score--1`);
let currentScore0 = document.getElementById(`current--0`);
let currentScore1 = document.getElementById(`current--1`);

let diceElmnt = document.querySelector(`.dice`);
let btnRoll = document.querySelector(`.btn--roll`);
let btnHold = document.querySelector(`.btn--hold`);
let btnNew = document.querySelector(`.btn--new`);
let scores, activePlayer, currentScore, playing;

let initialization = () => {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  diceElmnt.classList.add(`hidden`);

  score0Elmnt.textContent = 0;
  score1Elmnt.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0Elmnt.classList.remove(`player--winner`);
  player1Elmnt.classList.remove(`player--winner`);
  player1Elmnt.classList.add(`player--active`);
  player1Elmnt.classList.remove(`player--active`);
};
initialization();

let switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elmnt.classList.toggle(`player--active`);
  player1Elmnt.classList.toggle(`player--active`);
};

let rollDice = () => {
  if (playing) {
    //1. generate random number(1-6)
    let dice = Math.ceil(Math.random() * 6);
    console.log(typeof dice, dice);
    //2. display dice with that number
    diceElmnt.classList.remove(`hidden`); //making dice appear
    diceElmnt.src = `dice-${dice}.png`;
    //3. check for 1
    if (dice !== 1) {
      //4. if not 1, add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //currentScore0.textContent = currentScore; //change later
    } else {
      // if 1, switch to next player
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
};

let holdScore = () => {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // winning score = 20, can be changed
    if (scores[activePlayer] >= 20) {
      //game ends
      playing = false;
      diceElmnt.classList.add(`hidden`); //making dice disappear
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--active`);
    } else {
      switchPlayer();
    }
  }
};

let reset = () => {
  initialization();
};

btnRoll.addEventListener(`click`, rollDice);
btnHold.addEventListener(`click`, holdScore);
btnNew.addEventListener(`click`, reset);
