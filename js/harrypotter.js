const char = document.getElementById("char-name");
const image = document.getElementById("char-img");
const banned = document.getElementById("words-list");
const diff = document.getElementById("difficulty");

const correctSoundEffect = document.getElementById("correctSound");
const wrongSoundEffect = document.getElementById("wrongSound");
const skipSoundEffect = document.getElementById("skipSound");

const timeRunningOutSoundEffect = document.getElementById("runningOut");
const countdownSoundEffect = document.getElementById("countdownSound");

const alreadyShownCharacters = [];

let timeLeft = Number(sessionStorage.getItem("timer")) || 60;
let timer;

let Correct = 0;
let Wrong = 0;
let Skipped = 0;

let guessedCharacters = [];

function saveGame() {
    sessionStorage.setItem("gameState", JSON.stringify({
        timeLeft,
        Correct,
        Wrong,
        Skipped,
        guessedCharacters,
        alreadyShownCharacters,
        currentCharacter: char.textContent,
        currentImage: image.src,
        bannedWords: banned.innerHTML,
        difficulty: diff.innerHTML,
        isShown
    }));
}

const div = document.getElementById("countdown-div");
const cntdwn = document.getElementById("countdown");

function loadGame() {
    div.style.display = "none";
    document.getElementById("container").style.display = "flex";
    const game = JSON.parse(sessionStorage.getItem("gameState"));

    timeLeft = game.timeLeft;
    Correct = game.Correct;
    Wrong = game.Wrong;
    Skipped = game.Skipped;

    guessedCharacters = game.guessedCharacters;
    alreadyShownCharacters.push(...game.alreadyShownCharacters);

    char.textContent = game.currentCharacter;
    image.src = game.currentImage;
    banned.innerHTML = game.bannedWords;
    diff.innerHTML = game.difficulty;

    isShown = game.isShown;

    if (isShown) {
        char.style.display = "none";
        image.style.display = "block";
    } else {
        char.style.display = "block";
        image.style.display = "none";
    }

    document.getElementById("Points").textContent = Correct;

    updateTimerDisplay();
    startTimer();
}

function startNewGame() {
    countdownSoundEffect.volume = 0.3;
    countdownSoundEffect.play();
    let countdown = 3;

    div.style.display = "flex";
    cntdwn.textContent = countdown

    countdownSoundEffect.play();

    const timer = setInterval(() => {
    countdown--;

    if (countdown > 0) {
        cntdwn.textContent = countdown;
    } else {
        clearInterval(timer);
        div.style.display = "none";
        document.getElementById("container").style.display = "flex";
        randomizeCharacter();
        startTimer();
    }
}, 1000);
}

console.log(sessionStorage.getItem("timer"));
console.log(timeLeft);

function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {

    updateTimerDisplay(); // Show the starting time immediately

    timer = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();
        saveGame();

        if (timeLeft == 8) {
            timeRunningOutSoundEffect.volume = 0.2;
            timeRunningOutSoundEffect.play()
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }

    }, 1000);
}

async function randomizeCharacter() {
    const response = await fetch("/data/harrypotter.json");
    const characters = await response.json();

    const names = Object.keys(characters);

    if (alreadyShownCharacters.length === names.length) {
        alert("No characters left!");
        return;
    }

    const randomName = names[Math.floor(Math.random() * names.length)];

    if (alreadyShownCharacters.includes(randomName)) {
        randomizeCharacter()
        return
    }

    const randomCharacter = characters[randomName];

    console.log(randomName);
    console.log(randomCharacter);

    const difficultyNumber = randomCharacter.difficulty
    const difficulties = {
        1: "Lätt",
        2: "Medium",
        3: "Svårt"
    }

    char.textContent = randomName;
    image.src = "../img/harrypotter/" + randomCharacter.image
    difficulty.innerHTML = "Svårhetsgrad: <br>" + difficulties[difficultyNumber];
    alreadyShownCharacters.push(randomName);

    temp = "";
    for (let i = 0; i < randomCharacter.bannedWords.sv.length; i++) {
        temp += randomCharacter.bannedWords.sv[i] + "<br>";
    }
    banned.innerHTML = temp;

    saveGame();
}

window.addEventListener("DOMContentLoaded", () => {
    const saved = sessionStorage.getItem("gameState");

    if (saved) {
        loadGame();
    } else {
        startNewGame();
    }
});

let isShown = false

function toggleImg() {
    if (!isShown) {
        char.style.display = "none";
        image.style.display = "block";
        isShown = true;
    } else {
        char.style.display = "block";
        image.style.display = "none";
        isShown = false;
    }
}

function correct() {

    if (guessedCharacters.includes(char.textContent)) {
        return
    }

    guessedCharacters.push({
        name: char.textContent,
        image: image.src,
        result: "Rätt"
    });

    const sound = correctSoundEffect.cloneNode();
    sound.play();

    Correct++;
    document.getElementById("Points").textContent = Correct
    saveGame();
    randomizeCharacter();
}

function wrong() {

    if (guessedCharacters.includes(char.textContent)) {
        return
    }

    guessedCharacters.push({
        name: char.textContent,
        image: image.src,
        result: "Fel"
    });

    const sound = wrongSoundEffect.cloneNode();
    sound.play();

    Wrong++;
    saveGame();
    randomizeCharacter();
}

function skip() {

    if (guessedCharacters.includes(char.textContent)) {
        return
    }

    guessedCharacters.push({
        name: char.textContent,
        image: image.src,
        result: "Skippad"
    });

    const sound = skipSoundEffect.cloneNode();
    sound.volume = 0.4;
    sound.play();

    Skipped++;
    saveGame();
    randomizeCharacter();
}

function endGame() {

    const gameData = {
        correct: Correct,
        wrong: Wrong,
        skipped: Skipped,
        guesses: guessedCharacters,
        game: "Harrypotter"
    };

    sessionStorage.setItem(
        "gameData",
        JSON.stringify(gameData)
    );

    window.location.href = "../results.html";
}