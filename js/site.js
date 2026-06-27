function setLanguage(language) {
    console.log("You tried to set the language to " + language)
}

function startStarwars() {
    const timer = document.getElementById("timerInput").value;
    sessionStorage.setItem("startTimer", timer)
    sessionStorage.setItem("timer", timer);

    sessionStorage.removeItem("gameState");
    sessionStorage.removeItem("gameData");
    window.location.href = "../starwars.html";
}

function startHarrypotter() {
    const timer = document.getElementById("timerInput").value;
    sessionStorage.setItem("startTimer", timer)
    sessionStorage.setItem("timer", timer);

    sessionStorage.removeItem("gameState");
    sessionStorage.removeItem("gameData");
    window.location.href = "../harrypotter.html";
}