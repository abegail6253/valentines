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

  const wrongGiftSound = document.getElementById("wrongGiftSound");
  const yesClickSound = document.getElementById("yesClickSound");
  const confettiContainer = document.getElementById("confettiContainer");

  const startBtn = document.getElementById("startBtn");
  const outfitContinueBtn = document.getElementById("outfitContinueBtn");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const valentineText = document.getElementById("valentineText");

  const girlBear = document.getElementById("girlBear");
  const kissGifContainer = document.getElementById("kissGifContainer");
  const finalText = document.getElementById("finalText");

  // Restore state
  const savedScreen = localStorage.getItem("currentScreen");
  const savedChoice = localStorage.getItem("valentineChoice");

  if (savedScreen && !isNaN(savedScreen) && savedScreen < screens.length) current = parseInt(savedScreen);
  screens.forEach(s => s.classList.remove("active"));
  screens[current].classList.add("active");

  if (savedChoice !== null) {
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
    boxes[savedChoice].classList.add("selected");
  }

  // Navigation
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

  // Heart catch
  movingHeart.addEventListener("mouseover", () => {
    if (catchText.textContent === "Okay okay 😌 you caught me.") return;
    const parent = movingHeart.parentElement.getBoundingClientRect();
    const heartSize = movingHeart.getBoundingClientRect();
    movingHeart.style.position = "absolute";
    movingHeart.style.left = Math.random() * (parent.width - heartSize.width) + "px";
    movingHeart.style.top = Math.random() * (parent.height - heartSize.height) + "px";
  });

  movingHeart.addEventListener("click", () => {
    if (catchText.textContent === "Okay okay 😌 you caught me.") return;
    catchText.textContent = "Okay okay 😌 you caught me.";
    heartContinueBtn.style.display = "inline-block";
  });

  // Pick gift box
  boxes.forEach(box => {
    box.addEventListener("click", () => pickDate(parseInt(box.dataset.index), box));
    box.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" ") pickDate(parseInt(box.dataset.index), box); });
    box.setAttribute("tabindex","0");
  });

  function pickDate(index, btn){
    const savedChoice = localStorage.getItem("valentineChoice");
    if(savedChoice !== null && parseInt(savedChoice) !== index){
      showFunnyPopup();
      shakeBox(btn);
      wrongGiftSound.currentTime = 0;
      wrongGiftSound.play();
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

  function showFunnyPopup(){
    const messages = [
      "Hey! That’s not your box 😉",
      "Hmm… trying to cheat? 😏",
      "Nope! You already picked your favorite ❤️",
      "Nice try 😜",
      "Stick with your choice, it’s perfect! 😘"
    ];
    let msg;
    do { msg = messages[Math.floor(Math.random() * messages.length)]; } while(msg === lastPopup);
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

  function shakeBox(btn){ btn.classList.add("shake"); setTimeout(() => btn.classList.remove("shake"), 600); }

  // No button avoids
  noBtn.addEventListener("mouseover", () => {
    const parent = noBtn.parentElement.getBoundingClientRect();
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * (parent.width - noBtn.offsetWidth) + "px";
    noBtn.style.top = Math.random() * (parent.height - noBtn.offsetHeight) + "px";
  });

  // Yes button click
  yesBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Change the h2 text to the new message
    valentineText.textContent = "I knew you’d say yes! 😘";

    // Play yesClickSound
    yesClickSound.currentTime = 0;
    yesClickSound.play().catch(err => console.log("Yes sound blocked:", err));

    // Confetti effect
    startConfetti();

    // Show couple bear GIF
    girlBear.style.display = "none";
    kissGifContainer.innerHTML = `
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGs5aG51a3FiaHM3MnBwcjZ6NnJrdm5yOGR0NHB1aHo1ZjM2bGlmbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L2CGLm2BRDOXCe1uKz/giphy.gif"
           alt="Bear couple kissing" style="width:300px; border-radius:10px;">
    `;

    // Keep finalText
    finalText.textContent = "Yay! Counting down to Valentine’s Day with you ❤️";
  });

  function startConfetti(){
    for(let i=0;i<100;i++){
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
      confetti.style.backgroundColor = `hsl(${Math.random()*360},70%,60%)`;
      confettiContainer.appendChild(confetti);
      confetti.addEventListener("animationend", () => confetti.remove());
    }
  }
});
