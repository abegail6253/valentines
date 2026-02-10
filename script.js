let current = 0;
const screens = document.querySelectorAll(".screen");
const boxes = document.querySelectorAll(".box");
const dateResult = document.getElementById("dateResult");
const continueBtn = document.getElementById("continueBtn");

// -----------------
// Keep choice persistent with localStorage
// -----------------
window.addEventListener("DOMContentLoaded", () => {
  const savedChoice = localStorage.getItem("valentineChoice");
  if (savedChoice) {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
    disableBoxes();
  }
});

function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  screens[current].classList.add("active");
}

// -----------------
// Catch the heart
// -----------------
const movingHeart = document.getElementById("movingHeart");
const catchText = document.getElementById("catchText");

movingHeart.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  movingHeart.style.transform = `translate(${x}px, ${y}px)`;
});

movingHeart.addEventListener("click", () => {
  catchText.textContent = "Okay okay 😌 you caught me.";
  setTimeout(nextScreen, 1000);
});

// -----------------
// Pick date surprise with 3D effect
// -----------------
function pickDate(box, btn) {
  // Prevent picking again if already chosen
  if (localStorage.getItem("valentineChoice")) return;

  // Save choice
  localStorage.setItem("valentineChoice", box);

  // Animate the button to "open" (3D flip)
  btn.style.transition = "transform 0.6s";
  btn.style.transform = "rotateX(180deg)";

  // After 0.6s, reveal the resort surprise
  setTimeout(() => {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    btn.style.transform = "scale(1.1) rotateX(0deg)";
    continueBtn.style.display = "inline-block"; // show Continue button
    disableBoxes();
  }, 600);
}

function disableBoxes() {
  boxes.forEach(b => {
    b.disabled = true;
    b.style.cursor = "not-allowed";
    b.style.opacity = 0.6;
  });
}

// -----------------
// Final Valentine screen
// -----------------
function moveNo(btn) {
  const x = Math.random() * 150 - 75;
  const y = Math.random() * 150 - 75;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Happy Valentine’s Day ❤️";
}
