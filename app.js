let timer;
let isRunning = false;
let isPaused = false;
let remainingSeconds = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// Adding input fields to set a custom timer
let customHours = prompt("Enter hours:", "0") || 0;
let customMinutes = prompt("Enter minutes:", "0") || 0;
let customSeconds = prompt("Enter seconds:", "0") || 0;

let totalSeconds =
  parseInt(customHours) * 3600 +
  parseInt(customMinutes) * 60 +
  parseInt(customSeconds);

// Set the initial display to custom time
displayTime(totalSeconds);

// Event listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  if (!isRunning && !isPaused) {
    isRunning = true;
    timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        displayTime(totalSeconds);
      } else {
        clearInterval(timer);
        alert("Time's up!");
        playSound();
        resetTimer();
      }
    }, 1000);
  } else if (isPaused) {
    isPaused = false;
    isRunning = true;
    resumeTimer();
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isPaused = true;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  totalSeconds =
    parseInt(customHours) * 3600 +
    parseInt(customMinutes) * 60 +
    parseInt(customSeconds);
  displayTime(totalSeconds);
}

function displayTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  timerDisplay.textContent = `${formatTime(hrs)}:${formatTime(
    mins
  )}:${formatTime(secs)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function resumeTimer() {
  timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      displayTime(totalSeconds);
    } else {
      clearInterval(timer);
      alert("Time's up!");
      playSound();
      resetTimer();
    }
  }, 1000);
}

// Play a sound when the timer ends
function playSound() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
  audio.play();
}
