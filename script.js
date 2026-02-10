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

  const memorySequenceDiv = document.getElementById("memorySequence");
  const memoryButtonsDiv = document.getElementById("memoryButtons");
  const memoryResult = document.getElementById("memoryResult");
  const memoryContinueBtn = document.getElementById("memoryContinueBtn");

  // ------------------ RESTORE STATE ------------------
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

  // ------------------ NAVIGATION ------------------
  function nextScreen() {
    if (current >= screens.length - 1) return;
    screens[current].classList.remove("active");
    current++;
    screens[current].classList.add("active");
    localStorage.setItem("currentScreen", current);

    if (screens[current].querySelector("#memorySequence")) startMemoryGame();
    if (screens[current].querySelector("#countdownNumber")) startCountdown();
  }

  [startBtn, heartContinueBtn, continueBtn, outfitContinueBtn, quizContinueBtn, secretContinueBtn, memoryContinueBtn]
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
    catchText.textContent = "Okay okay 😌 you caught me.";
    heartContinueBtn.style.display = "inline-block";
    catchGifContainer.innerHTML = `<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenp4MDczdDFrZXRxbWV3NjhvN2oxcHl5cW1kcjlpcGZkMmpnZ3N1YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oJQjQgACNyHgxXmMTi/giphy.gif" alt="Caught heart GIF" style="width:250px;border-radius:10px;">`;
    startConfetti();
  });

  // ------------------ GIFT BOXES ------------------
  const correctGiftIndex = 0; // correct box index

  boxes.forEach(box => {
    box.addEventListener("click", () => pickDate(parseInt(box.dataset.index), box));
    box.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" ") pickDate(parseInt(box.dataset.index), box); });
    box.setAttribute("tabindex", "0");
  });

  function pickDate(index, btn) {
    const savedChoice = localStorage.getItem("valentineChoice");
    if (savedChoice !== null && parseInt(savedChoice) !== index) {
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

  function showFunnyPopup() {
    const messages = [
      "Hey! That’s not your box 😉",
      "Hmm… trying to cheat? 😏",
      "Nope! You already picked your favorite ❤️",
      "Nice try 😜",
      "Stick with your choice, it’s perfect! 😘"
    ];
    let msg;
    do { msg = messages[Math.floor(Math.random()*messages.length)]; } while(msg === lastPopup);
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

  function shakeBox(btn) {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 600);
  }

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
  secretHearts.forEach(h=>{
    h.addEventListener("mouseover",()=>heartMsg.textContent=h.dataset.msg);
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

  // ------------------ MEMORY GAME ------------------
  let sequence = [];
  let userSequence = [];
  const emojis = ["❤️","💌","🥰","🌹","💖","💋"];
  const loveNotes = [
    "You remembered my ❤️! So sweet 🥰",
    "Perfect! Our love is in sync 💖",
    "Amazing! Just like us 💌",
    "You got it! My heart melts 🥰"
  ];

  function startMemoryGame(){
    sequence = [];
    userSequence = [];
    memoryResult.textContent="";
    memoryButtonsDiv.innerHTML="";

    const chosenEmojis = [...emojis].sort(()=>0.5-Math.random()).slice(0,3);
    sequence = chosenEmojis;

    memorySequenceDiv.textContent="";
    let i = 0;

    function flashEmoji(){
      if(i >= sequence.length){
        memorySequenceDiv.textContent="❓";
        setTimeout(createMemoryButtons, 500);
        return;
      }
      memorySequenceDiv.style.opacity = "0";
      memorySequenceDiv.textContent = sequence[i];
      setTimeout(()=>{ memorySequenceDiv.style.opacity="1"; }, 100);
      setTimeout(()=>{
        memorySequenceDiv.style.opacity="0";
        i++;
        setTimeout(flashEmoji, 300);
      }, 700);
    }
    flashEmoji();
  }

  function createMemoryButtons(){
    memoryButtonsDiv.innerHTML="";
    const shuffled = [...sequence].sort(()=>0.5-Math.random());
    shuffled.forEach(e=>{
      const btn=document.createElement("button");
      btn.textContent=e;
      btn.style.fontSize="30px";
      btn.addEventListener("click",()=> handleMemoryClick(e));
      memoryButtonsDiv.appendChild(btn);
    });
  }

  function handleMemoryClick(e){
    userSequence.push(e);
    memorySequenceDiv.textContent = userSequence.join(" ");
    if(userSequence.length===sequence.length){
      if(userSequence.join("")===sequence.join("")){
        memoryResult.textContent = loveNotes[Math.floor(Math.random()*loveNotes.length)];
        memoryContinueBtn.style.display="inline-block";
        setTimeout(nextScreen, 2000);
      } else {
        memoryResult.textContent = "❌ Wrong! Try again 💌";
        userSequence = [];
        memorySequenceDiv.textContent="❓";
      }
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
        setTimeout(nextScreen, 800); // go to Valentine screen
      }
    }, 1000);
  }
});
