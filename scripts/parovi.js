var scoreDisplay = document.querySelector(".score-display");
var score = parseInt(localStorage.getItem("score")) || 0;
scoreDisplay.textContent = "Bodovi: " + score;

var emojis = ["🔥", "⭐", "🌙", "💎", "🎯", "🌸", "⚡", "🍀"];
var cards = emojis.concat(emojis);

for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
}

var grid = document.getElementById("parovi-grid");
var flipped = [];
var matched = 0;
var locked = false;

cards.forEach(function(emoji, index) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    var front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = emoji;

    var back = document.createElement("div");
    back.classList.add("card-back");

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", function() {
        if (locked) return;
        if (card.classList.contains("flipped")) return;
        if (card.classList.contains("matched")) return;

        card.classList.add("flipped");
        flipped.push(card);

        if (flipped.length === 2) {
            locked = true;
            if (flipped[0].dataset.value === flipped[1].dataset.value) {
                flipped[0].classList.add("matched");
                flipped[1].classList.add("matched");
                score++;
                localStorage.setItem("score", score);
                scoreDisplay.textContent = "Bodovi: " + score;
                matched++;
                flipped = [];
                locked = false;
            } else {
                setTimeout(function() {
                    flipped[0].classList.remove("flipped");
                    flipped[1].classList.remove("flipped");
                    flipped = [];
                    locked = false;
                }, 900);
            }
        }
    });

    grid.appendChild(card);
});
