var button = document.getElementById("klik-button");
var scoreDisplay = document.querySelector(".score-display");

var score = parseInt(localStorage.getItem("klik-score")) || 0;
scoreDisplay.textContent = "Bodovi: " + score;

var green = false;
var timeout;

function waitAndTurnGreen() {
    var delay = Math.random() * 3000 + 1000;
    timeout = setTimeout(function() {
        button.style.backgroundColor = "green";
        green = true;
    }, delay);
}

button.addEventListener("click", function() {
    if (green) {
        score++;
        localStorage.setItem("klik-score", score);
        scoreDisplay.textContent = "Bodovi: " + score;
        button.style.backgroundColor = "gray";
        green = false;
        waitAndTurnGreen();
    }
});

waitAndTurnGreen();