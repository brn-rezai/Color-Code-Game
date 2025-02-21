const colors = ["red", "yellow", "orange", "green", "purple", "blue"];
const levelTimes = { easy: 300, medium: 600, hard: 900 };
const levelLengths = { easy: 6, medium: 8, hard: 10 };
let selectedLevel = "easy"; 
let currentGuess = [];
let remainingGuesses = 10;
let timeLeft = levelTimes[selectedLevel];

document.addEventListener("DOMContentLoaded", () => {
    setupGame();
    startTimer();
});

function setupGame() {
    generatePassword();
    displayColorOptions();
}

function generatePassword() {
    password = [];
    for (let i = 0; i < levelLengths[selectedLevel]; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        password.push(randomColor);
    }
}

function displayColorOptions() {
    const colorContainer = document.getElementById("color-options");
    colors.forEach(color => {
        const div = document.createElement("div");
        div.classList.add("color");
        div.style.backgroundColor = color;
        div.addEventListener("click", () => selectColor(color, div));
        colorContainer.appendChild(div);
    });
}

function selectColor(color, element) {
    if (currentGuess.length < levelLengths[selectedLevel]) {
        currentGuess.push(color);
        element.classList.add("selected");
        updateCurrentGuessDisplay();
    }
}

function updateCurrentGuessDisplay() {
    const guessContainer = document.getElementById("current-guess");
    guessContainer.innerHTML = "";
    currentGuess.forEach(color => {
        const div = document.createElement("div");
        div.classList.add("color");
        div.style.backgroundColor = color;
        guessContainer.appendChild(div);
    });
}

document.getElementById("submit-guess").addEventListener("click", submitGuess);

function submitGuess() {
    if (currentGuess.length !== levelLengths[selectedLevel]) {
        alert("Please select exactly " + levelLengths[selectedLevel] + " colors.");
        return;
    }

    remainingGuesses--;
    document.getElementById("remaining-guesses").textContent = remainingGuesses;

    const feedback = checkGuess();
    displayGuess(feedback);

    if (feedback.correct === password.length) {
        alert("You guessed correctly! You win " + getPoints() + " points.");
        resetGame();
    } else if (remainingGuesses === 0) {
        alert("Game Over! The correct password was: " + password.join(", "));
        resetGame();
    }

    currentGuess = [];
    updateCurrentGuessDisplay();
}

function checkGuess() {
    let correct = 0, misplaced = 0;
    let passwordCopy = [...password];
    let guessCopy = [...currentGuess];

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] === passwordCopy[i]) {
            correct++;
            passwordCopy[i] = null;
            guessCopy[i] = null;
        }
    }

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] && passwordCopy.includes(guessCopy[i])) {
            misplaced++;
            passwordCopy[passwordCopy.indexOf(guessCopy[i])] = null;
        }
    }

    return { correct, misplaced };
}

function displayGuess(feedback) {
    const guessContainer = document.getElementById("guesses");
    const div = document.createElement("div");

    currentGuess.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = color;
        div.appendChild(colorDiv);
    });

    const text = document.createElement("span");
    text.textContent = ' Correct: ${feedback.correct}, Misplaced: ${feedback.misplaced}';
    div.appendChild(text);

    guessContainer.appendChild(div);
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    const interval = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = '${minutes}:${seconds < 10 ? "0" : ""}${seconds}';

        if (timeLeft <= 10) {
            timerElement.classList.add("timer-red");
        }
        if (timeLeft <= 0) {
            clearInterval(interval);
            alert("Time's up! The correct password was: " + password.join(", "));
            resetGame();
        }
    }, 1000);
}

function getPoints() {
    return selectedLevel === "easy" ? 5 : selectedLevel === "medium" ? 10 : 20;
}

function resetGame() {
    location.reload();
}
const API_URL = "https://your-mockapi-url.com/scores"; // آدرس API

async function updatePlayerScore(playerName, points) {
    try {
        // دریافت امتیاز فعلی بازیکن
        let response = await fetch(`${API_URL}?name=${playerName}`);
        let data = await response.json();

        if (data.length > 0) {
            // اگر بازیکن قبلاً ثبت شده بود، امتیازش را آپدیت کن
            let player = data[0];
            let newScore = player.score + points; 

            await fetch(`${API_URL}/${player.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score: newScore }),
            });
        } else {
            // اگر بازیکن جدید بود، یک ورودی جدید در دیتابیس بساز
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: playerName, score: points }),
            });
        }

        console.log("Score updated successfully!");
    } catch (error) {
        console.error("Error updating score:", error);
    }
}
async function getTopScores() {
    try {
        let response = await fetch(API_URL);
        let players = await response.json();

        // مرتب‌سازی بر اساس امتیاز (بیشترین امتیاز در بالا)
        players.sort((a, b) => b.score - a.score);

        // فقط 10 نفر اول را نشان بده
        let topPlayers = players.slice(0, 10);

        let scoreBoard = document.getElementById("scoreboard");
        scoreBoard.innerHTML = "";

        topPlayers.forEach((player, index) => {
            let entry = document.createElement("li");
            entry.textContent = '${index + 1}. ${player.name} - ${player.score} points';
            scoreBoard.appendChild(entry);
        });
    } catch (error) {
        console.error("Error fetching scores:", error);
    }
}

// هنگام لود صفحه امتیازات را بگیر
document.addEventListener("DOMContentLoaded", getTopScores);
if (playerWins) {
    let playerName = prompt("You won! Enter your name to save your score:");
    updatePlayerScore(playerName, getPointsBasedOnLevel());
}
function getPointsBasedOnLevel() {
    let level = localStorage.getItem("gameLevel"); 
    if (level === "easy") return 5;
    if (level === "medium") return 10;
    if (level === "hard") return 20;
    return 0;
}