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
 
var score = parseInt(localStorage.getItem("score")) || 0;
var display = document.querySelector(".score-display");
if (display) display.textContent = "Bodovi: " + score;