// --- Countdown Logic ---
// Target: 5th May 2025, 9:00 AM IST (Asia/Kolkata)
function getTargetDateIST() {
  // JS Date months are 0-based
  return new Date(Date.UTC(2025, 4, 3, 8, 06, 0)); // 9:00 AM IST = 3:30 AM UTC
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
    startFireworks(); // Start fireworks when countdown ends
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
    startFireworks(); // Start fireworks when doors open
  } else {
    document.getElementById('doorsFrame').classList.remove('open');
    document.getElementById('startBtn').style.display = 'none';
  }
}
setInterval(checkAndOpenDoor, 1000);

// --- Redirect Button ---
document.getElementById('startBtn').onclick = function() {
  // Show the Martian intro instead of redirecting immediately
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
    // Redirect to the main site when the button is clicked
    window.location.href = "https://section-a-site-final.vercel.app/";
  };
}

// --- Falling Stars Animation ---
function createFallingStar() {
  const star = document.createElement('div');
  star.className = 'falling-star';
  star.style.position = 'absolute';
  star.style.width = '2px';
  star.style.height = '24px';
  star.style.background = 'linear-gradient(180deg, #fff 60%, #ff8a00 100%)';
  star.style.borderRadius = '50%';
  star.style.opacity = '0.8';
  star.style.boxShadow = '0 0 12px 2px #fff, 0 0 20px 6px #ff8a0033';
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 10}vh`;
  star.style.animation = 'star-fall 2.4s linear forwards';
  
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 2600);
}

// Add falling stars animation
setInterval(createFallingStar, 300);

// --- Fireworks Animation ---
const fwCanvas = document.getElementById('fireworks');
const fwCtx = fwCanvas.getContext('2d');
let fireworks = [];
let fireworksActive = false;

function resizeFwCanvas() {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeFwCanvas);
resizeFwCanvas();

function launchFirework() {
  const x = Math.random() * fwCanvas.width * 0.8 + fwCanvas.width * 0.1;
  const y = Math.random() * fwCanvas.height * 0.3 + fwCanvas.height * 0.1;
  const colors = ['#ff8a00', '#fff', '#1e90ff', '#ff3b30', '#ffd700'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 50; i++) {
    const angle = (Math.PI * 2) * (i / 50);
    const speed = Math.random() * 4 + 2;
    fireworks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color
    });
  }
}

function drawFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  fireworks.forEach(fw => {
    fwCtx.save();
    fwCtx.globalAlpha = fw.alpha;
    fwCtx.beginPath();
    fwCtx.arc(fw.x, fw.y, 2.2, 0, Math.PI * 2);
    fwCtx.fillStyle = fw.color;
    fwCtx.shadowColor = fw.color;
    fwCtx.shadowBlur = 12;
    fwCtx.fill();
    fwCtx.restore();
    fw.x += fw.vx;
    fw.y += fw.vy;
    fw.vx *= 0.98;
    fw.vy *= 0.98;
    fw.alpha -= 0.012;
  });
  fireworks = fireworks.filter(fw => fw.alpha > 0.05);
  if (fireworksActive) requestAnimationFrame(drawFireworks);
}

// Call this after countdown ends
function startFireworks() {
  if (fireworksActive) return; // Prevent multiple starts
  
  fwCanvas.style.display = 'block';
  fireworksActive = true;
  function loop() {
    if (!fireworksActive) return;
    launchFirework();
    setTimeout(loop, 650 + Math.random() * 400);
  }
  loop();
  drawFireworks();
}

// Call this to stop fireworks (if needed)
function stopFireworks() {
  fireworksActive = false;
  fwCanvas.style.display = 'none';
}

// --- For testing purposes ---
// Uncomment this to test the intro without waiting for the target date
/*
function testIntro() {
  // Simulate doors opening
  document.getElementById('doorsFrame').classList.add('open');
  document.getElementById('startBtn').style.display = 'block';
  startFireworks();
  
  // To test the intro directly
  // showMartianIntro();
}
// Uncomment to test: setTimeout(testIntro, 2000);
*/
