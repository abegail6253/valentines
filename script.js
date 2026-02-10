document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let selectedBox = null; // track chosen box
  let lastPopup = null;

  const screens = document.querySelectorAll(".screen");

  const startBtn = document.getElementById("startBtn");
  const heartContinueBtn = document.getElementById("heartContinueBtn");
  const continueBtn = document.getElementById("continueBtn");
  const outfitContinueBtn = document.getElementById("outfitContinueBtn");
  const quizContinueBtn = document.getElementById("quizContinueBtn");
  const secretContinueBtn = document.getElementById("secretContinueBtn");
  const memoryContinueBtn = document.getElementById("memoryContinueBtn");

  const movingHeart = document.getElementById("movingHeart");
  const catchText = document.getElementById("catchText");
  const catchGifContainer = document.getElementById("catchGifContainer");

  const boxes = document.querySelectorAll(".box");
  const dateResult = document.getElementById("dateResult");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const valentineText = document.getElementById("valentineText");
  const girlBear = document.getElementById("girlBear");
  const kissGifContainer = document.getElementById("kissGifContainer");
  const finalText = document.getElementById("finalText");

  const quizBtns = document.querySelectorAll(".quizBtn");
  const quizResult = document.getElementById("quizResult");

  const secretHearts = document.querySelectorAll(".secretHeart");
  const heartMsg = document.getElementById("heartMsg");

  const wrongGiftSound = document.getElementById("wrongGiftSound");
  const yesClickSound = document.getElementById("yesClickSound");
  const quizCorrectSound = document.getElementById("quizCorrectSound");
  const quizWrongSound = document.getElementById("quizWrongSound");
  const confettiContainer = document.getElementById("confettiContainer");

  // ------------------ NAVIGATION ------------------
  function nextScreen() {
    if(current >= screens.length -1) return;
    screens[current].classList.remove("active");
    current++;
    screens[current].classList.add("active");

    if(screens[current].querySelector("#memorySequence")) startMemoryGame();
  }

  [startBtn, heartContinueBtn, continueBtn, outfitContinueBtn, quizContinueBtn, secretContinueBtn, memoryContinueBtn]
    .forEach(btn => { if(btn) btn.addEventListener("click", nextScreen); });

  // ------------------ HEART CATCH ------------------
  movingHeart?.addEventListener("mouseover", () => {
    if(catchText.textContent) return;
    const parent = movingHeart.parentElement.getBoundingClientRect();
    const heartSize = movingHeart.getBoundingClientRect();
    movingHeart.style.position="absolute";
    movingHeart.style.left = Math.random() * (parent.width - heartSize.width) + "px";
    movingHeart.style.top = Math.random() * (parent.height - heartSize.height) + "px";
  });

  movingHeart?.addEventListener("click", () => {
    if(catchText.textContent) return;
    catchText.textContent = "Okay okay 😌 you caught me.";
    heartContinueBtn.style.display = "inline-block";
    catchGifContainer.innerHTML=`<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenp4MDczdDFrZXRxbWV3NjhvN2oxcHl5cW1kcjlpcGZkMmpnZ3N1YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oJQjQgACNyHgxXmMTi/giphy.gif" style="width:250px;border-radius:10px;">`;
    startConfetti();
  });

  // ------------------ GIFT BOXES ------------------
  boxes.forEach(box => {
    box.addEventListener("click", () => {
      if(selectedBox) return; // lock choice
      selectedBox = box;
      box.classList.add("selected");
      dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
      continueBtn.style.display = "inline-block";
    });
    box.addEventListener("keydown", e => { 
      if((e.key==="Enter" || e.key===" ") && !selectedBox){
        selectedBox = box;
        box.classList.add("selected");
        dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
        continueBtn.style.display = "inline-block";
      }
    });
    box.setAttribute("tabindex","0");
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

  // ------------------ YES/NO BUTTONS ------------------
  noBtn?.addEventListener("mouseover",()=>{
    const parent=noBtn.parentElement.getBoundingClientRect();
    noBtn.style.position="absolute";
    noBtn.style.left=Math.random()*(parent.width-noBtn.offsetWidth)+"px";
    noBtn.style.top=Math.random()*(parent.height-noBtn.offsetHeight)+"px";
  });

  yesBtn?.addEventListener("click",()=>{
    valentineText.textContent="I knew you’d say yes! 😘";
    yesClickSound.currentTime=0;
    yesClickSound.play().catch(()=>{});
    startConfetti();
    girlBear.style.display="none";
    kissGifContainer.innerHTML=`<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGs5aG51a3FiaHM3MnBwcjZ6NnJrdm5yOGR0NHB1aHo1ZjM2bGlmbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L2CGLm2BRDOXCe1uKz/giphy.gif" style="width:300px;border-radius:10px;">`;
    finalText.textContent="Yay! Counting down to Valentine’s Day with you ❤️";
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
  const memorySequenceDiv = document.getElementById("memorySequence");
  const memoryButtonsDiv = document.getElementById("memoryButtons");
  const memoryResult = document.getElementById("memoryResult");

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
    for(let i=0;i<4;i++){
      sequence.push(emojis[Math.floor(Math.random()*emojis.length)]);
    }
    memorySequenceDiv.textContent="";
    let i=0;
    const interval = setInterval(()=>{
      memorySequenceDiv.textContent = sequence[i];
      i++;
      if(i>=sequence.length){
        clearInterval(interval);
        memorySequenceDiv.textContent="❓";
        createMemoryButtons();
      }
    },1000);
  }

  function createMemoryButtons(){
    memoryButtonsDiv.innerHTML="";
    const shuffled = [...emojis].sort(()=>0.5-Math.random());
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
      } else {
        memoryResult.textContent = "❌ Wrong! Try again 💌";
        userSequence = [];
      }
    }
  }

});
