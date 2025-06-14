const canvas = document.getElementById('fogCanvas');
const ctx = canvas.getContext('2d');
const quoteBox = document.getElementById('quote');
const resetBtn = document.getElementById('resetBtn');

// Resize canvas
canvas.width = canvas.offsetWidth = 400;
canvas.height = canvas.offsetHeight = 600;

// Initial fill fog
function fillFog() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(200,200,200,0.95)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
fillFog();

// Variables to track progress
const totalPixels = canvas.width * canvas.height;
let clearedRatio = 0;
let isQuoteShown = false;

// Quotes
const quotes = {
  list: [
    "You are amazing just the way you are.",
    "Believe in your inner magic.",
    "Shine from within.",
    "You are enough.",
    "Reflect, recharge, rise!"
  ],
  getRandom() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  }
};

// Eraser size
const eraserSize = 20;

canvas.addEventListener('mousemove', function (e) {
  if (isQuoteShown) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, eraserSize, 0, Math.PI * 2, false);
  ctx.fill();

  updateClearedRatio();
});

function updateClearedRatio() {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let count = 0;

  for (let i = 3; i < imgData.data.length; i += 4) {
    if (imgData.data[i] < 200) count++;
  }

  clearedRatio = count / (totalPixels * 0.5); // slowed

  if (clearedRatio > 0.8 && !isQuoteShown) {
    isQuoteShown = true;
    clearFogCompletely();
    showQuote();
  }
}

function clearFogCompletely() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function showQuote() {
  quoteBox.textContent = quotes.getRandom();
  quoteBox.classList.remove('hidden');
  setTimeout(() => quoteBox.classList.add('show'), 100);
}

resetBtn.addEventListener('click', () => {
  isQuoteShown = false;
  quoteBox.classList.add('hidden');
  quoteBox.classList.remove('show');
  fillFog();
});
