const data = JSON.parse(sessionStorage.getItem("gameData"));

document.getElementById("correct").textContent = data.correct;
document.getElementById("wrong").textContent = data.wrong;
document.getElementById("skipped").textContent = data.skipped;

const history = document.getElementById("history");

data.guesses.forEach(character => {

    let colorClass = "White";

    if (character.result == "Rätt") {
        colorClass = "rgb(0, 255, 0)";
    } else if (character.result == "Fel") {
        colorClass = "rgb(255, 65, 65)";
    } else {
        colorClass = "rgb(255, 255, 100)";
    }

    history.innerHTML += `

        <div class="character">

            <img src="${character.image}">

            <div class="character-info">

                <h3>${character.name}</h3>

                <p style="color: ${colorClass}">${character.result}</p>

            </div>

        </div>

    `;

});

function playAgain() {
    const startTimer = sessionStorage.getItem("startTimer");

    let game = data.game;

    sessionStorage.removeItem("gameState");
    sessionStorage.removeItem("gameData");

    sessionStorage.setItem("timer", startTimer);

    if (game == "Starwars") {
        window.location.href = "../starwars.html";
    } else if (game == "Harrypotter") {
        window.location.href = "../harrypotter.html";
    } else if (game == "Marvel") {
        window.location.href = "../marvel.html";
    } else {
        window.location.href = "../allFranchises.html";
    }
}

function home() {
    sessionStorage.removeItem("gameState");
    sessionStorage.removeItem("gameData");
    window.location.href = "../index.html";
}