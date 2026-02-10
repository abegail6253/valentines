document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
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

  // Navigation
  function nextScreen() {
    if(current >= screens.length -1) return;
    screens[current].classList.remove("active");
    current++;
    screens[current].classList.add("active");
    localStorage.setItem("currentScreen", current);
  }

  [startBtn, heartContinueBtn, continueBtn, outfitContinueBtn, quizContinueBtn, secretContinueBtn].forEach(btn=>{
    if(btn) btn.addEventListener("click", nextScreen);
  });

  // Heart Catch
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

  // Gift Boxes
  boxes.forEach(box=>{
    box.addEventListener("click",()=>pickDate(parseInt(box.dataset.index),box));
    box.setAttribute("tabindex","0");
  });
  function pickDate(index, btn){
    localStorage.setItem("valentineChoice",index);
    boxes.forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    dateResult.textContent = `Surprise! 🌊 We're going to Almeja Azul Lyr Beach Resort! ❤️`;
    continueBtn.style.display="inline-block";
  }

  // Quiz
  quizBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
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

  // Secret Hearts
  secretHearts.forEach(h=>{
    h.addEventListener("mouseover",()=>heartMsg.textContent=h.dataset.msg);
  });

  // No button hover escape
  noBtn?.addEventListener("mouseover",()=>{
    const parent=noBtn.parentElement.getBoundingClientRect();
    noBtn.style.position="absolute";
    noBtn.style.left=Math.random()*(parent.width-noBtn.offsetWidth)+"px";
    noBtn.style.top=Math.random()*(parent.height-noBtn.offsetHeight)+"px";
  });

  // Yes button
  yesBtn?.addEventListener("click",()=>{
    valentineText.textContent="I knew you’d say yes! 😘";
    yesClickSound.play().catch(()=>{});
    startConfetti();
    girlBear.style.display="none";
    kissGifContainer.innerHTML=`<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGs5aG51a3FiaHM3MnBwcjZ6NnJrdm5yOGR0NHB1aHo1ZjM2bGlmbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L2CGLm2BRDOXCe1uKz/giphy.gif" style="width:300px;border-radius:10px;">`;
    finalText.textContent="Yay! Counting down to Valentine’s Day with you ❤️";
  });

  // Confetti
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
});
