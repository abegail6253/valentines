document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let lastPopup = null;

  const screens = document.querySelectorAll(".screen");
  const boxes = document.querySelectorAll(".box");
  const dateResult = document.getElementById("dateResult");
  const continueBtn = document.getElementById("continueBtn");
  const heartContinueBtn = document.getElementById("heartContinueBtn");
  const movingHeart = document.getElementById("movingHeart");
  const catchText = document.getElementById("catchText");
  const popupSound = document.getElementById("popupSound");
  const confettiSound = document.getElementById("confettiSound");
  const confettiContainer = document.getElementById("confettiContainer");

  // Buttons
  const startBtn = document.getElementById("startBtn");
  const outfitContinueBtn = document.getElementById("outfitContinueBtn");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  // -----------------
  // Restore state
  // -----------------
  const savedScreen = localStorage.getItem("currentScreen");
  const savedChoice = localStorage.getItem("valentineChoice");

  if (savedScreen && !isNaN(savedScreen) && savedScreen < screens.length) {
    current = parseInt(savedScreen);
  }

  screens.forEach(s => s.classList.remove("active"));
  screens[current].classList.add("active");

  if (savedChoice !== null) {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
    boxes[savedChoice].classList.add("selected");
  }

  // -----------------
  // Navigation
  // -----------------
  function nextScreen() {
    if (current >= screens.length - 1) return;
    screens[current].classList.remove("active");
    current++;
    screens[current].classList.add("active");
    localStorage.setItem("currentScreen", current);
  }

  startBtn.addEventListener("click", nextScreen);
  heartContinueBtn.addEventListener("click", nextScreen);
  continueBtn.addEventListener("click", nextScreen);
  outfitContinueBtn.addEventListener("click", nextScreen);

  // -----------------
  // Heart catch (stay in bounds)
  // -----------------
  movingHeart.addEventListener("mouseover", () => {
    if (catchText.textContent === "Okay okay 😌 you caught me.") return;

    const parent = movingHeart.parentElement.getBoundingClientRect();
    const heartSize = movingHeart.getBoundingClientRect();

    const maxX = parent.width - heartSize.width;
    const maxY = parent.height - heartSize.height;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    movingHeart.style.position = "absolute";
    movingHeart.style.left = x + "px";
    movingHeart.style.top = y + "px";
  });

  movingHeart.addEventListener("click", () => {
    if (catchText.textContent === "Okay okay 😌 you caught me.") return;
    catchText.textContent = "Okay okay 😌 you caught me.";
    heartContinueBtn.style.display = "inline-block";
    movingHeart.setAttribute("aria-label", "Heart caught!");
  });

  // Keyboard accessibility for heart
  movingHeart.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      movingHeart.click();
    }
  });

  // -----------------
  // Pick gift box
  // -----------------
  boxes.forEach(box => {
    box.addEventListener("click", () => pickDate(parseInt(box.dataset.index), box));
    box.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") pickDate(parseInt(box.dataset.index), box);
    });
    box.setAttribute("tabindex", "0");
  });

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
      popup.addEventListener("animationend", () => popup.remove());
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
  noBtn.addEventListener("mouseover", () => {
    const parent = noBtn.parentElement.getBoundingClientRect();
    const maxX = parent.width - noBtn.offsetWidth;
    const maxY = parent.height - noBtn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  yesBtn.addEventListener("click", () => {
    document.getElementById("finalText").textContent =
      "Yay! Counting down to Valentine’s Day with you ❤️";
    startConfetti();
  });

  // -----------------
  // Confetti
  // -----------------
  function startConfetti() {
    confettiSound.currentTime = 0;
    confettiSound.play();

    for(let i=0; i<100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
      confetti.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 60%)`;
      confettiContainer.appendChild(confetti);

      confetti.addEventListener("animationend", () => confetti.remove());
    }
  }
});
