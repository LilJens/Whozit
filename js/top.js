let isOpened = false
function toggleLanguages() {
    const dropdown = document.getElementById("language-dropdown");
    if (!isOpened) {
        dropdown.style.display = "flex";
        isOpened = true
    } else {
        dropdown.style.display = "none";
        isOpened = false
    }
}

window.addEventListener("load", (event) => {
    let Timer = sessionStorage.getItem("timer");
    document.getElementById("timerInput").value = Timer
})