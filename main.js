export let fruits = [];
import { Fruit } from "./sketch.js";
let focusPeriod = 0.25;
let timer;
let isRunning = false;
let timeLeft = focusPeriod * 60;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

function updateDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  hoursDisplay.textContent = String(hours).padStart(2, "0");
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (isRunning && timeLeft === 0) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      resetTimer();
      fruits.push(new Fruit());
      return;
    }

    timeLeft--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = focusPeriod * 60;
  isRunning = false;
  updateDisplay();
}

window.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.code === "Enter") {
    startTimer();
  } else if (e.code === "Space") {
    pauseTimer();
  } else if (e.code === "KeyR") {
    resetTimer();
  }
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
