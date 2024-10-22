const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    personagem: document.querySelector(".personagem"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },

  values: {
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 30,
  },

  actions: {
    timerID: setInterval(randomSquare, 1000),
    countDownTimerID: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerID);
    clearInterval(state.actions.timerID);
    alert("Tempo esgotado! Seu resultado foi: " + state.values.result);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.mp3`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("personagem");
  });

  let randomNumber = Math.floor(Math.random() * 21);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("personagem");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("sucesso");
      }
    });
  });
}

function init() {
  addListenerHitBox();
}
init();
