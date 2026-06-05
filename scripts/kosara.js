var canvas = document.getElementById("kosara-canvas");
var ctx = canvas.getContext("2d");
var scoreDisplay = document.querySelector(".score-display");

var score = parseInt(localStorage.getItem("score")) || 0;
scoreDisplay.textContent = "Bodovi: " + score;

var basketImg = new Image();
basketImg.src = "assets/basket.png";

var basketW = 100;
var basketH = 80;
var basketX = canvas.width / 2 - basketW / 2;
var basketY = canvas.height - basketH - 10;

var circles = [];
var mouseX = canvas.width / 2;

canvas.addEventListener("mousemove", function(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
});

canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
}, { passive: false });

function spawnCircle() {
    circles.push({
        x: Math.random() * (canvas.width - 30) + 15,
        y: -20,
        r: 15,
        speed: Math.random() * 2 + 2,
        color: "hsl(" + Math.floor(Math.random() * 360) + ", 80%, 60%)"
    });
}

setInterval(spawnCircle, 1000);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    basketX = mouseX - basketW / 2;
    basketX = Math.max(0, Math.min(canvas.width - basketW, basketX));
    basketY = canvas.height - basketH - 10;

    for (var i = circles.length - 1; i >= 0; i--) {
        var c = circles[i];
        c.y += c.speed;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        ctx.closePath();

        // catch check — krug u zoni košare
        var catchZoneTop = basketY + 10;
        if (c.y + c.r >= catchZoneTop && c.y - c.r <= catchZoneTop + 20) {
            if (c.x >= basketX + 10 && c.x <= basketX + basketW - 10) {
                circles.splice(i, 1);
                score++;
                localStorage.setItem("score", score);
                scoreDisplay.textContent = "Bodovi: " + score;
                continue;
            }
        }

        // izvan ekrana
        if (c.y - c.r > canvas.height) {
            circles.splice(i, 1);
        }
    }

    ctx.drawImage(basketImg, basketX, basketY, basketW, basketH);

    requestAnimationFrame(gameLoop);
}

basketImg.onload = function() {
    gameLoop();
};
