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

  // Validate savedScreen
  if (savedScreen && !isNaN(savedScreen) && savedScreen < screens.length) {
    current = parseInt(savedScreen);
  } else {
    current = 0;
  }

  // Hide all screens first
  screens.forEach(screen => screen.classList.remove("active"));

  // Show the correct screen
  screens[current].classList.add("active");

  // Restore choice highlight if picked
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
  setTimeout(() => nextScreen(), 1000);
});

// -----------------
// Pick gift box
// -----------------
function pickDate(index, btn) {
  if (localStorage.getItem("valentineChoice") !== null) return;

  // Save choice
  localStorage.setItem("valentineChoice", index);

  // Highlight picked box
  btn.classList.add("selected");

  // 3D flip effect
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
  const x = Math.random() * 300 - 150; // bigger jump
  const y = Math.random() * 300 - 150;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Happy Valentine’s Day ❤️";
}
