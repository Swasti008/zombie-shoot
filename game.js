// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
let seconds = document.getElementById("timer").textContent;
console.log(seconds);
var zombieId = 0;
const zombieImg = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
// Iteration 1.2: Add shotgun sound
const shot = new Audio("./assets/shotgun.wav");
shot.volume = 0.3;
gameBody.onclick = () => {
  shot.pause();
  shot.currentTime = 0;
  shot.play();
};
// Iteration 1.3: Add background sound
const Sound = new Audio("./assets/bgm.mp3");
Sound.play();
Sound.loop = true;

// Iteration 1.4: Add lives
const maxlives = 4;
var lives = 4;

// Iteration 2: Write a function to make a zombie

function makeZombie() {
  randomImage = zombieImg[getRandomInt(0, zombieImg.length)];
  gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
  let zombie = document.getElementById("zombie" + zombieId);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieDestruct(zombie);
  };
}

// Iteration 3: Write a function to check if the player missed a zombie

function Collision(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieDestruct(zombie) {
  zombie.style.display = "none";
  zombieId++;
  makeZombie();
}

// Iteration 5: Creating timer

var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie" + zombieId);
  if (Collision(zombie) == true) {
    zombieDestruct(zombie);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie

makeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
} 