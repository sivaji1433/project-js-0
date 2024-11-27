let timer;
let timeLeft = 60; // Time limit in seconds
let typingStart = false;
let wordCount = 0;
let errorCount = 0;
let correctChars = 0;
let totalChars = 0;

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const typingArea = document.getElementById('typingArea');
const timerDisplay = document.getElementById('timer');  // time
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const errorsDisplay = document.getElementById('errors');
const passage = document.getElementById('passage');

const passageText = passage.textContent;

function startTest() {
  typingStart = true;
  startBtn.disabled = true;
  typingArea.disabled = false;
  typingArea.focus();

  timer = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = `Time Remaining: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      finishTest();
    }
  }, 1000);

  typingArea.addEventListener('input', handleTyping);
}

function finishTest() {
  typingArea.disabled = true;
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  wpmDisplay.textContent = `Words per Minute: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
  errorsDisplay.textContent = `Errors: ${errorCount}`;

  startBtn.disabled = false;
  resetBtn.style.display = 'inline-block';
}

function handleTyping() {
  const typedText = typingArea.value;
  let correctTyped = 0;
  let currentErrorCount = 0;

  totalChars = typedText.length;
  errorCount = 0;

  let highlightedPassage = '';
  for (let i = 0; i < passageText.length; i++) {
    const typedChar = typedText[i] || '';
    const originalChar = passageText[i];
    if (typedChar === originalChar) {
      correctTyped++;
      highlightedPassage += `<span class="text-success">${typedChar}</span>`;
    } else if (typedChar !== '') {
      currentErrorCount++;
      highlightedPassage += `<span class="text-danger">${typedChar}</span>`;
    } else {
      highlightedPassage += `<span class="text-muted">${originalChar}</span>`;
    }
  }

  errorCount = currentErrorCount;
  passage.innerHTML = highlightedPassage;

  correctChars = correctTyped;
  updateStats();
}

function calculateWPM() {
  return Math.floor((correctChars / 5) / (60 - timeLeft) * 60);
}

function calculateAccuracy() {
  const accuracy = (correctChars / totalChars) * 100;
  return accuracy.toFixed(2);
}

function updateStats() {
  wpmDisplay.textContent = `Words per Minute: ${calculateWPM()}`;
  accuracyDisplay.textContent = `Accuracy: ${calculateAccuracy()}%`;
}

function resetTest() {
  timeLeft = 60;
  wordCount = 0;
  errorCount = 0;
  correctChars = 0;
  totalChars = 0;

  typingArea.value = '';
  passage.innerHTML = passageText;

  wpmDisplay.textContent = `Words per Minute: 0`;
  accuracyDisplay.textContent = `Accuracy: 0%`;
  errorsDisplay.textContent = `Errors: 0`;

  startBtn.disabled = false;
  resetBtn.style.display = 'none';
  timerDisplay.textContent = `Time Remaining: 60 seconds`;
}

startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);
