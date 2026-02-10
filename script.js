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

  if (savedScreen) {
    current = parseInt(savedScreen);
  }

  showScreen(current);

  // If already picked a date, restore date result
  if (savedChoice) {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
    disableBoxes();
  }
});

// -----------------
// Screen navigation
// -----------------
function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  if(current >= screens.length) current = screens.length - 1;
  showScreen(current);
  localStorage.setItem("currentScreen", current);
}

function showScreen(index) {
  screens.forEach((screen, i) => {
    screen.classList.toggle("active", i === index);
  });
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
  setTimeout(() => {
    nextScreen();
  }, 1000);
});

// -----------------
// Pick date surprise
// -----------------
function pickDate(box, btn) {
  if (localStorage.getItem("valentineChoice")) return;

  localStorage.setItem("valentineChoice", box);

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
  const x = Math.random() * 150 - 75;
  const y = Math.random() * 150 - 75;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Happy Valentine’s Day ❤️";
}
