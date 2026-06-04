var main = document.getElementById("cvjetovi-main");
var scoreDisplay = document.getElementById("cvjetovi-score");

var score = parseInt(localStorage.getItem("cvjetovi-score")) || 0;
scoreDisplay.textContent = "Bodovi: " + score;

function spawnFlower() {
    var flower = document.createElement("img");
    flower.src = "assets/flower.png";
    flower.classList.add("cvjet");

    var mainRect = main.getBoundingClientRect();
    var size = 60;
    var maxX = mainRect.width - size;
    var maxY = mainRect.height - size;

    flower.style.left = Math.random() * maxX + "px";
    flower.style.top = Math.random() * maxY + "px";

    flower.addEventListener("click", function () {
        score++;
        localStorage.setItem("cvjetovi-score", score);
        scoreDisplay.textContent = "Bodovi: " + score;
        flower.remove();
        spawnFlower();
    });

    main.appendChild(flower);
}

spawnFlower();