let current = 0;
const screens = document.querySelectorAll(".screen");

function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  screens[current].classList.add("active");
}

// Catch the heart
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

// Pick date
function pickDate(choice) {
  document.getElementById("dateResult").textContent =
    `Perfect. I’d love ${choice} with you ❤️`;
}

// Final
function moveNo(btn) {
  const x = Math.random() * 150 - 75;
  const y = Math.random() * 150 - 75;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function yes() {
  document.getElementById("finalText").textContent =
    "Yay! Happy Valentine’s Day ❤️";
}
