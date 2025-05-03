// --- Countdown Logic ---
// Target: 5th May 2025, 9:00 AM IST (Asia/Kolkata)
function getTargetDateIST() {
  // JS Date months are 0-based
  return new Date(Date.UTC(2025, 4, 5, 3, 30, 0)); // 9:00 AM IST = 3:30 AM UTC
}
const targetDate = getTargetDateIST();

function updateCountdown() {
  const now = new Date();
  let diff = targetDate - now;
  const countdownDiv = document.getElementById('countdown');
  if (diff <= 0) {
    countdownDiv.textContent = "The wait is over!";
    document.getElementById('doorsFrame').classList.add('open');
    document.getElementById('startBtn').style.display = 'block';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  countdownDiv.textContent =
    `Unveiling in ${days}d ${hours}h ${mins}m ${secs}s`;
  setTimeout(updateCountdown, 1000);
}
updateCountdown();

// --- Door Animation + Button Logic ---
function checkAndOpenDoor() {
  const now = new Date();
  if (now >= targetDate) {
    document.getElementById('doorsFrame').classList.add('open');
    document.getElementById('startBtn').style.display = 'block';
  } else {
    document.getElementById('doorsFrame').classList.remove('open');
    document.getElementById('startBtn').style.display = 'none';
  }
}
setInterval(checkAndOpenDoor, 1000);

// --- Redirect Button ---
document.getElementById('startBtn').onclick = function() {
  showMartianIntro();
};

// --- Martian Intro Modal ---
function showMartianIntro() {
  const intro = document.getElementById('martianIntro');
  const typeDiv = document.getElementById('martianType');
  const btn = document.getElementById('martianIntroBtn');
  intro.style.display = 'flex';

  const lines = [
    "Hello, are you a Martian?<br>",
    "Welcome to the Section A Civil Engineering Portal,<br>2024–28, Jadavpur University.<br>",
    "Your journey to the Red Planet begins now!"
  ];
  let line = 0, char = 0;
  function typeLine() {
    if (line < lines.length) {
      if (char < lines[line].length) {
        typeDiv.innerHTML = lines.slice(0, line).join('') + lines[line].slice(0, char+1) + '<span class="type-cursor">|</span>';
        char++;
        setTimeout(typeLine, 35);
      } else {
        char = 0; line++;
        setTimeout(typeLine, 600);
      }
    } else {
      typeDiv.innerHTML = lines.join('');
      btn.style.display = 'inline-block';
    }
  }
  typeLine();
  btn.onclick = () => {
    window.location.href = "https://section-a-site-final.vercel.app/";
  };
}

// --- Starry Night Sky Animation ---
const starCanvas = document.getElementById('starCanvas');
const ctx = starCanvas.getContext('2d');
let stars = [];

function resizeStarCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  createStars();
}
window.addEventListener('resize', resizeStarCanvas);

function createStars() {
  stars = [];
  const numStars = Math.floor(window.innerWidth / 2);
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height * 0.85,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.4 + 0.6,
      twinkle: Math.random() * 0.05 + 0.01
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  for (let s of stars) {
    ctx.save();
    ctx.globalAlpha = s.alpha + Math.sin(Date.now() * s.twinkle) * 0.25;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
  requestAnimationFrame(drawStars);
}

resizeStarCanvas();
drawStars();
