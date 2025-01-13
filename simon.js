let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ['one', 'two', 'three', 'four'];
let h2 = document.querySelector('h2');
let body = document.querySelector('body');
let currentScore = 0; // Example: Update this value as the game progresses
let highScore = localStorage.getItem('highScore') || 0; // Retrieve from storage or default to 0

function toggleRules(){

    const rules = document.getElementById("rulesbox");

    rules.classList.toggle("active");

}
document.addEventListener("keypress", function () {
    if ( started == false ) {
        console.log('game started');
        started = true;
        levelUp();
    }
})
function gameFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}
function userFlash (btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}
function levelUp() {
    userSeq = [];
    level++;
    currentScore = level;
    h2.innerHTML = `Level ${level} <br> Highest Score: ${highScore}`;
    //selecting random btn
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(`gameSeq = ${gameSeq}`);
    gameFlash(randBtn);
}

function checkAns (idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp,1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! <br><mark>Your score was ${level} </mark> <br> Press any key to start again !`
        body.style.backgroundColor='red';
        setTimeout(reset,500);
    }
}
function btnPress () {
    // console.log(this);
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    // console.log(`userSeq = ${userSeq}`);
    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset () {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    body.style.backgroundColor='';
    updateHighScore(currentScore);
}
function updateHighScore(score) {
    // Compare the current score with the high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore); // Save new high score
      console.log(`New High Score: ${highScore}`);
    } else {
      console.log(`Try again! Your score: ${score}`);
    }
  }
  
