const char = document.getElementById("char-name");
const image = document.getElementById("char-img");

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