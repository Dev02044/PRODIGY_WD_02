let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 1;

const displayElement = document.getElementById('display');
const lapsListElement = document.getElementById('lapsList');

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateDisplay, 10); // Update every 10ms for milliseconds precision
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    lapCounter = 1;
    displayElement.textContent = "00:00:00.00";
    lapsListElement.innerHTML = ""; // Clear laps list
}

function lapTime() {
    if (isRunning) {
        const lapTime = displayElement.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsListElement.appendChild(lapItem);
        lapCounter++;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;

    let milliseconds = Math.floor((updatedTime % 1000) / 10);
    let seconds = Math.floor((updatedTime / 1000) % 60);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);

    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    hours = (hours < 10) ? "0" + hours : hours;

    displayElement.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
