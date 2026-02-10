let current = 0;
const screens = document.querySelectorAll(".screen");
const boxes = document.querySelectorAll(".box");
const dateResult = document.getElementById("dateResult");
const continueBtn = document.getElementById("continueBtn");

// -----------------
// Restore state on page load
// -----------------
window.addEventListener("DOMContentLoaded", () => {
  const savedScreen = localStorage.getItem("currentScreen");
  const savedChoice = localStorage.getItem("valentineChoice");

  if (savedScreen && !isNaN(savedScreen) && savedScreen < screens.length) {
    current = parseInt(savedScreen);
  } else {
    current = 0;
  }

  screens.forEach(screen => screen.classList.remove("active"));
  screens[current].classList.add("active");

  // Restore gift box selection
  if (savedChoice !== null) {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
    disableBoxes();
    boxes[savedChoice].classList.add("selected");
  }
});

// -----------------
// Screen navigation
// -----------------
function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  if (current >= screens.length) current = screens.length - 1;
  screens[current].classList.add("active");
  localStorage.setItem("currentScreen", current);
}

// -----------------
// Catch the heart (Screen 2)
// -----------------
const movingHeart = document.getElementById("movingHeart");
const catchText = document.getElementById("catchText");

movingHeart.addEventListener("mouseover", () => {
  const x = Math.random() * 300 - 150; // faster movement
  const y = Math.random() * 300 - 150;
  movingHeart.style.transform = `translate(${x}px, ${y}px)`;
});

movingHeart.addEventListener("click", () => {
  catchText.textContent = "Okay okay 😌 you caught me.";
  setTimeout(() => nextScreen(), 500);
});

// -----------------
// Pick gift box (Screen 3)
// -----------------
function pickDate(index, btn) {
  if (localStorage.getItem("valentineChoice") !== null) return;

  localStorage.setItem("valentineChoice", index);
  btn.classList.add("selected");

  btn.style.transition = "transform 0.6s";
  btn.style.transform = "rotateX(180deg)";

  setTimeout(() => {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    btn.style.transform = "scale(1.1) rotateX(0deg)";
    continueBtn.style.display = "inline-block";
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
  const x = Math.random() * 500 - 250; // much faster movement
  const y = Math.random() * 500 - 250;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Happy Valentine’s Day ❤️";
}
