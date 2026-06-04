const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

var klikScore = parseInt(localStorage.getItem("klik-score")) || 0;
var cvjetoviScore = parseInt(localStorage.getItem("cvjetovi-score")) || 0;

document.getElementById("valuta-display").textContent = "Bodovi: " + (klikScore + cvjetoviScore);