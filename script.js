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
  const x = Math.random() * 300 - 150; 
  const y = Math.random() * 300 - 150;
  movingHeart.style.transform = `translate(${x}px, ${y}px)`;
});

movingHeart.addEventListener("click", () => {
  catchText.textContent = "Okay okay 😌 you caught me.";
  setTimeout(() => nextScreen(), 500);
});

// -----------------
// Pick gift box (Screen 3) with funny popup
// -----------------
function pickDate(index, btn) {
  const savedChoice = localStorage.getItem("valentineChoice");

  if (savedChoice !== null) {
    if (parseInt(savedChoice) !== index) {
      showFunnyPopup();
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
    disableBoxes();
  }, 600);
}

// -----------------
// Disable boxes
// -----------------
function disableBoxes() {
  boxes.forEach(b => {
    b.disabled = true;
    b.style.cursor = "not-allowed";
    b.style.opacity = 0.6;
  });
}

// -----------------
// Naughty / Funny popup
// -----------------
function showFunnyPopup() {
  const messages = [
    "Hey! That’s not your box 😉",
    "Hmm… trying to cheat? 😏",
    "Nope! You already picked your favorite ❤️",
    "Nice try, Dadecakes 😜",
    "Stick with your choice, it’s perfect! 😘"
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  const popup = document.createElement("div");
  popup.textContent = msg;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "#ffccd5";
  popup.style.color = "#ff1a6b";
  popup.style.padding = "15px 25px";
  popup.style.borderRadius = "20px";
  popup.style.fontSize = "16px";
  popup.style.fontWeight = "bold";
  popup.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
  popup.style.zIndex = 1000;
  popup.style.textAlign = "center";

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2000);
}

// -----------------
// Final Valentine screen
// -----------------
function moveNo(btn) {
  const x = Math.random() * 500 - 250;
  const y = Math.random() * 500 - 250;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Counting down to Valentine’s Day with you ❤️";
}
