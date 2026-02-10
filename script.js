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
  const catchGifContainer = document.getElementById("catchGifContainer");
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

  const quizBtns = document.querySelectorAll(".quizBtn");
  const quizResult = document.getElementById("quizResult");
  const quizCorrectSound = document.getElementById("quizCorrectSound");
  const quizWrongSound = document.getElementById("quizWrongSound");

  const secretHearts = document.querySelectorAll(".secretHeart");
  const heartMsg = document.getElementById("heartMsg");

  const miniBoxes = document.querySelectorAll(".miniBox");
  const miniSurpriseResult = document.getElementById("miniSurpriseResult");
  const miniSurpriseContinueBtn = document.getElementById("miniSurpriseContinueBtn");

  const dayBtns = document.querySelectorAll(".dayBtn");
  const dayResult = document.getElementById("dayResult");
  const dayContinueBtn = document.getElementById("dayContinueBtn");

  // ------------------ RESTORE STATE ------------------
  screens.forEach(s => s.classList.remove("active"));
  screens[current].classList.add("active");

  // ------------------ NAVIGATION ------------------
  function nextScreen() {
    if (current >= screens.length - 1) return;
    screens[current].classList.remove("active");
    current++;
    screens[current].classList.add("active");
    localStorage.setItem("currentScreen", current);

    if (screens[current].querySelector("#countdownNumber")) startCountdown();
  }

  [startBtn, heartContinueBtn, continueBtn, outfitContinueBtn, quizContinueBtn, secretContinueBtn,
   miniSurpriseContinueBtn, dayContinueBtn]
    .forEach(btn => { if (btn) btn.addEventListener("click", nextScreen); });

  // ------------------ HEART CATCH ------------------
  movingHeart?.addEventListener("mouseover", () => {
    if (catchText.textContent === "Okay okay 😌 you caught me.") return;
    const parent = movingHeart.parentElement.getBoundingClientRect();
    const heartSize = movingHeart.getBoundingClientRect();
    movingHeart.style.position = "absolute";
    movingHeart.style.left = Math.random() * (parent.width - heartSize.width) + "px";
    movingHeart.style.top = Math.random() * (parent.height - heartSize.height) + "px";
  });

  movingHeart?.addEventListener("click", () => {
    if (catchText.textContent === "Okay okay 😌 you caught me.") return;
    catchText.textContent = `Okay okay 😌 you caught me, Dadecakes!`;
    heartContinueBtn.style.display = "inline-block";
    catchGifContainer.innerHTML = `<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenp4MDczdDFrZXRxbWV3NjhvN2oxcHl5cW1kcjlpcGZkMmpnZ3N1YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oJQjQgACNyHgxXmMTi/giphy.gif" alt="Caught heart GIF" style="width:250px;border-radius:10px;">`;
    startConfetti();
  });

  // ------------------ GIFT BOXES ------------------
  boxes.forEach(box => {
    box.addEventListener("click", () => pickDate(parseInt(box.dataset.index), box));
  });

  function pickDate(index, btn) {
    const savedChoice = localStorage.getItem("valentineChoice");
    if (savedChoice !== null && parseInt(savedChoice) !== index) {
      showFunnyPopup(`Oops, not this box… try again, Dadecakes 😘`);
      shakeBox(btn);
      wrongGiftSound.currentTime = 0;
      wrongGiftSound.play();
      return;
    }
    localStorage.setItem("valentineChoice", index);
    boxes.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display = "inline-block";
  }

  function showFunnyPopup(msg=null) {
    const messages = [
      "Hey! That’s not your box 😉",
      "Hmm… trying to cheat? 😏",
      "Nope! You already picked your favorite ❤️",
      "Nice try 😜",
      "Stick with your choice, it’s perfect! 😘"
    ];
    let message = msg || messages[Math.floor(Math.random()*messages.length)];
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.className = "funny-popup";
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add("fade-out");
      popup.addEventListener("animationend", () => popup.remove());
    }, 2000);
  }

  function shakeBox(btn) {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 600);
  }

  // ------------------ MINI SURPRISE BOXES ------------------
  miniBoxes.forEach((box, i)=>{
    box.addEventListener("click", ()=>{
      const surprises = [
        "😂 Silly fail GIF! Just for laughs!",
        "💖 A cute GIF just for you!",
        "🥰 This voucher is good for a foot massage from me!"
      ];
      miniSurpriseResult.textContent = surprises[i];
      startConfetti();
      miniSurpriseContinueBtn.style.display = "inline-block";
    });
  });

  // ------------------ CALENDAR DAY PICK ------------------
  dayBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      dayResult.textContent = `Yay! You picked day ${btn.textContent}, Dadecakes! 🌸`;
      startConfetti();
      dayContinueBtn.style.display="inline-block";
    });
  });

  // ------------------ QUIZ ------------------
  quizBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if(btn.dataset.answer==="correct"){
        quizResult.textContent="Correct! 🍦 You know me well 😘";
        quizCorrectSound.play();
        quizContinueBtn.style.display="inline-block";
      }else{
        quizResult.textContent="Oops! Wrong answer 😅 Try again.";
        quizWrongSound.play();
      }
    });
  });

  // ------------------ SECRET HEARTS ------------------
  secretHearts.forEach(h=>{ h.addEventListener("mouseover",()=>heartMsg.textContent=h.dataset.msg); });

  // ------------------ YES/NO BUTTONS ------------------
  noBtn?.addEventListener("mouseover", () => {
    const parent = noBtn.parentElement.getBoundingClientRect();
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random()*(parent.width-noBtn.offsetWidth)+"px";
    noBtn.style.top = Math.random()*(parent.height-noBtn.offsetHeight)+"px";
  });

  yesBtn?.addEventListener("click", () => {
    valentineText.textContent = "I knew you’d say yes! 😘";
    yesClickSound.currentTime = 0;
    yesClickSound.play().catch(()=>{});
    startConfetti();
    girlBear.style.display = "none";
    kissGifContainer.innerHTML = `<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGs5aG51a3FiaHM3MnBwcjZ6NnJrdm5yOGR0NHB1aHo1ZjM2bGlmbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L2CGLm2BRDOXCe1uKz/giphy.gif" style="width:300px;border-radius:10px;">`;
    finalText.textContent = "Yay! Counting down to Valentine’s Day with you ❤️";
  });

  // ------------------ CONFETTI ------------------
  function startConfetti(){
    for(let i=0;i<100;i++){
      const conf=document.createElement("div");
      conf.className="confetti";
      conf.style.left=Math.random()*100+"%";
      conf.style.animationDuration=(Math.random()*3+2)+"s";
      conf.style.backgroundColor=`hsl(${Math.random()*360},70%,60%)`;
      confettiContainer.appendChild(conf);
      conf.addEventListener("animationend",()=>conf.remove());
    }
  }

  // ------------------ COUNTDOWN ------------------
  function startCountdown() {
    const countdownEl = document.getElementById("countdownNumber");
    if (!countdownEl) return;
    let count = 5;
    countdownEl.textContent = count;
    const timer = setInterval(() => {
      count--;
      countdownEl.textContent = count;
      if (count === 0) {
        clearInterval(timer);
        setTimeout(nextScreen, 800);
      }
    }, 1000);
  }

});
