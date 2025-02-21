// select elements from HTML file:
const startBtn = document.querySelector(".start-button");
const difficultySelect = document.querySelector("#difficulty-select");
const gameContainer = document.querySelector(".game-container");
const gameInfo = document.querySelector(".game-info");
const colorOptions = document.querySelectorAll(".color-options .color");
const currentGuessContainer = document.querySelector(".current-guess");
const submitBtn = document.querySelector(".submit-button");
const remainingGuessesElem = document.querySelector(
  ".status-bar span:first-child"
);
const timerElem = document.querySelector(".timer");
const previousGuessesContainer = document.querySelector(".previous-guesses");
const backBtn = document.querySelector(".back-button");
const undoBtn = document.querySelector(".undo-button");

//
//
// set the variables:
let selectedDifficulty = null;
let codeLength = 6;
let maxGuesses = 10;
let score = [];
let timeLeft = 30;
let timerInterval = null;
let secretCode = [];
let currentGuess = [];
let remainingGuesses = maxGuesses;

//
//
// set colors:
const colors = ["purple", "yellow", "blue", "green", "orange", "red"];

//
//
// start button:
startBtn.addEventListener("click", () => {
  selectedDifficulty = difficultySelect.value;

  if (selectedDifficulty === "easy") {
    codeLength = 6;
    timeLeft = 300;
  } else if (selectedDifficulty === "medium") {
    codeLength = 8;
    timeLeft = 600;
  } else if (selectedDifficulty === "hard") {
    codeLength = 10;
    timeLeft = 900;
  }

  initializeGame();
});

//
//
// second pg:
function initializeGame() {
  gameInfo.style.display = "none";
  gameContainer.classList.add("fade-in");
  gameContainer.style.display = "block";

  remainingGuesses = maxGuesses;
  currentGuess = [];
  secretCode = generateSecretCode();
  previousGuessesContainer.innerHTML = "";
  remainingGuessesElem.textContent = `Remaining Guesses: ${remainingGuesses}`;
  updateTimer();

  document.querySelector(".progress").style.width = "100%";

  // timer:
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    document.querySelector(".progress").style.width = `${
      (timeLeft /
        (selectedDifficulty === "easy"
          ? 300
          : selectedDifficulty === "medium"
          ? 600
          : 900)) *
      100
    }%`;

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

//
//
// generate random color codes :
function generateSecretCode() {
  const code = [];
  for (let i = 0; i < codeLength; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    code.push(randomColor);
  }
  return code;
}

// update the timer:
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (timeLeft <= 10) {
    timerElem.classList.add("warning");
  } else {
    timerElem.classList.remove("warning");
  }
  timerElem.textContent = `Time Left: ${formattedTime}`;
}

// user color selection :
colorOptions.forEach((colorElement) => {
  colorElement.addEventListener("click", () => {
    if (currentGuess.length < codeLength) {
      const color = colorElement.style.backgroundColor;
      currentGuess.push(color);

      const colorDiv = document.createElement("div");
      colorDiv.classList.add("selected-color");
      colorDiv.style.backgroundColor = color;
      currentGuessContainer.appendChild(colorDiv);
    }
  });
});

//
//
//submit button:
submitBtn.addEventListener("click", () => {
  if (currentGuess.length !== codeLength) {
    alert(`You must select exactly ${codeLength} colors!`);
    return;
  }

  const result = checkGuess();
  remainingGuesses--;

  displayGuessResult(result);

  if (result.correct === codeLength) {
    endGame(true);
  } else if (remainingGuesses === 0) {
    endGame(false);
  }

  remainingGuessesElem.textContent = `Remaining Guesses: ${remainingGuesses}`;

  currentGuess = [];
  currentGuessContainer.innerHTML = "";
});

//
//Undo button:
undoBtn.addEventListener("click", () => {
  if (currentGuess.length > 0) {
    currentGuess.pop();
    currentGuessContainer.removeChild(currentGuessContainer.lastChild);
  }
});

//
//
//back button:
backBtn.addEventListener("click", () => {
  gameInfo.style.display = "block";
  gameContainer.style.display = "none";
  clearInterval(timerInterval);
});

//check user selection with the main color code:
function checkGuess() {
  let correct = 0;
  let misplaced = 0;
  const tempSecretCode = [...secretCode];
  const tempGuess = [...currentGuess];

  for (let i = 0; i < codeLength; i++) {
    if (tempGuess[i] === tempSecretCode[i]) {
      correct++;
      tempSecretCode[i] = null;
      tempGuess[i] = null;
    }
  }

  for (let i = 0; i < codeLength; i++) {
    if (tempGuess[i] && tempSecretCode.includes(tempGuess[i])) {
      misplaced++;
      tempSecretCode[tempSecretCode.indexOf(tempGuess[i])] = null;
    }
  }

  return { correct, misplaced };
}

//
//
//results:
function displayGuessResult(result) {
  const guessDiv = document.createElement("div");
  guessDiv.classList.add("previous-guess");

  const colorsDiv = document.createElement("div");
  colorsDiv.classList.add("colors");

  currentGuess.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;
    colorsDiv.appendChild(colorDiv);
  });

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("result");
  resultDiv.textContent = `Correct: ${result.correct}, Misplaced: ${result.misplaced}`;

  guessDiv.appendChild(colorsDiv);
  guessDiv.appendChild(resultDiv);

  previousGuessesContainer.appendChild(guessDiv);
}

//
//
//Done section:
function endGame(won) {
  clearInterval(timerInterval);
  if (won) {
    alert(`WoOoOow! Congratulations, You won! Score: ${score}`);
  } else {
    alert(
      `Game Over! You failed to guess the code. The correct code was:  ${secretCode.join(
        ", "
      )}`
    );
  }

  resetGame();
}

//
//
// reset section:
function resetGame() {
  gameInfo.style.display = "block";
  gameContainer.style.display = "none";
  currentGuessContainer.innerHTML = "";
  secretCode = [];
  currentGuess = [];
  remainingGuesses = maxGuesses;
  // timeLeft = 30;
  timerElem.classList.remove("warning");
}
