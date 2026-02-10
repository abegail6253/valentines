let current = 0;
const screens = document.querySelectorAll(".screen");
const boxes = document.querySelectorAll(".box");
const dateResult = document.getElementById("dateResult");
const continueBtn = document.getElementById("continueBtn");
const popupSound = document.getElementById("popupSound");
const heartContinueBtn = document.getElementById("heartContinueBtn");
const movingHeart = document.getElementById("movingHeart");
const catchText = document.getElementById("catchText");
const confettiSound = document.getElementById("confettiSound");

let lastPopup = null; // to prevent same popup twice

// -----------------
// Restore state
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

  if (savedChoice !== null) {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
    boxes[savedChoice].classList.add("selected");
  }
});

// -----------------
// Navigation
// -----------------
function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  if (current >= screens.length) current = screens.length - 1;
  screens[current].classList.add("active");
  localStorage.setItem("currentScreen", current);
}

// -----------------
// Heart catch
// -----------------
movingHeart.addEventListener("mouseover", () => {
  if (catchText.textContent === "Okay okay 😌 you caught me.") return;
  const x = Math.random() * 300 - 150; 
  const y = Math.random() * 300 - 150;
  movingHeart.style.transform = `translate(${x}px, ${y}px)`;
});

movingHeart.addEventListener("click", () => {
  if (catchText.textContent === "Okay okay 😌 you caught me.") return;
  catchText.textContent = "Okay okay 😌 you caught me.";
  heartContinueBtn.style.display = "inline-block";
});

// -----------------
// Pick gift box
// -----------------
function pickDate(index, btn) {
  const savedChoice = localStorage.getItem("valentineChoice");

  if (savedChoice !== null) {
    if (parseInt(savedChoice) !== index) {
      showFunnyPopup();
      shakeBox(btn);
      popupSound.currentTime = 0;
      popupSound.play();
    }
    return;
  }

  localStorage.setItem("valentineChoice", index);
  boxes.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  btn.style.transition = "transform 0.6s";
  btn.style.transform = "rotateX(180deg)";

  setTimeout(() => {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    btn.style.transform = "scale(1.1) rotateX(0deg)";
    continueBtn.style.display = "inline-block";
  }, 600);
}

// -----------------
// Funny popup
// -----------------
function showFunnyPopup() {
  const messages = [
    "Hey! That’s not your box 😉",
    "Hmm… trying to cheat? 😏",
    "Nope! You already picked your favorite ❤️",
    "Nice try, Dadecakes 😜",
    "Stick with your choice, it’s perfect! 😘"
  ];

  let msg;
  do {
    msg = messages[Math.floor(Math.random() * messages.length)];
  } while(msg === lastPopup);

  lastPopup = msg;

  const popup = document.createElement("div");
  popup.textContent = msg;
  popup.className = "funny-popup";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("fade-out");
    setTimeout(() => popup.remove(), 500);
  }, 2000);
}

// -----------------
// Shake box
// -----------------
function shakeBox(btn) {
  btn.classList.add("shake");
  setTimeout(() => btn.classList.remove("shake"), 600);
}

// -----------------
// Final screen
// -----------------
function moveNo(btn) {
  const x = Math.random() * 500 - 250;
  const y = Math.random() * 500 - 250;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Counting down to Valentine’s Day with you ❤️";
  startConfetti();
}

// -----------------
// Confetti
// -----------------
function startConfetti() {
  confettiSound.currentTime = 0;
  confettiSound.play();

  const container = document.getElementById("confettiContainer");
  for(let i=0; i<100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
    confetti.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 60%)`;
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}
