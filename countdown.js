// --- Countdown Logic ---
// Target: 5th May 2025, 9:00 AM IST (Asia/Kolkata)
function getTargetDateIST() {
  // JS Date months are 0-based
  return new Date(Date.UTC(2025, 4, 3, 8, 22, 0)); // 9:00 AM IST = 3:30 AM UTC
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

// --- Fireworks Animation ---
const fireworksCanvas = document.getElementById('fireworksCanvas');
const fwCtx = fireworksCanvas.getContext('2d');
let fireworks = [];
let particles = [];
let fireworksActive = false;

function resizeFireworksCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeFireworksCanvas);
resizeFireworksCanvas();

// Firework class
class Firework {
  constructor() {
    this.x = Math.random() * fireworksCanvas.width * 0.8 + fireworksCanvas.width * 0.1;
    this.y = fireworksCanvas.height;
    this.targetY = Math.random() * fireworksCanvas.height * 0.5;
    this.speed = 2 + Math.random() * 3;
    this.angle = Math.PI / 2 - (Math.random() * 0.2 - 0.1);
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = -Math.sin(this.angle) * this.speed;
    this.hue = Math.floor(Math.random() * 360);
    this.brightness = 50 + Math.floor(Math.random() * 30);
    this.alpha = 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.03; // gravity
    
    // If firework reaches target height or starts falling, explode
    if (this.vy >= 0 || this.y <= this.targetY) {
      this.explode();
      return false;
    }
    return true;
  }
  
  explode() {
    const particleCount = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(this.x, this.y, this.hue));
    }
  }
  
  draw() {
    fwCtx.beginPath();
    fwCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    fwCtx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    fwCtx.fill();
    
    // Trail
    fwCtx.beginPath();
    fwCtx.moveTo(this.x, this.y);
    fwCtx.lineTo(this.x - this.vx * 4, this.y - this.vy * 4);
    fwCtx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, 0.5)`;
    fwCtx.lineWidth = 1;
    fwCtx.stroke();
  }
}

// Particle class (for explosion)
class Particle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue + Math.random() * 30 - 15;
    this.brightness = 50 + Math.floor(Math.random() * 30);
    this.alpha = 1;
    this.speed = 0.5 + Math.random() * 4;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.gravity = 0.05;
    this.friction = 0.98;
    this.size = 1 + Math.random() * 2;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.alpha -= 0.01;
    return this.alpha > 0.05;
  }
  
  draw() {
    fwCtx.beginPath();
    fwCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    fwCtx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    fwCtx.shadowColor = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    fwCtx.shadowBlur = 8;
    fwCtx.fill();
  }
}

function launchFirework() {
  fireworks.push(new Firework());
}

function drawFireworks() {
  fwCtx.globalCompositeOperation = 'destination-out';
  fwCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  fwCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fwCtx.globalCompositeOperation = 'lighter';
  
  // Update and draw fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    if (!fireworks[i].update()) {
      fireworks.splice(i, 1);
    } else {
      fireworks[i].draw();
    }
  }
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].update()) {
      particles.splice(i, 1);
    } else {
      particles[i].draw();
    }
  }
  
  if (fireworksActive) {
    requestAnimationFrame(drawFireworks);
  }
}

function startFireworks() {
  if (fireworksActive) return; // Prevent multiple starts
  
  fireworksCanvas.style.display = 'block';
  fireworksActive = true;
  
  // Launch fireworks at random intervals
  function launchLoop() {
    if (!fireworksActive) return;
    launchFirework();
    setTimeout(launchLoop, 400 + Math.random() * 800);
  }
  
  launchLoop();
  drawFireworks();
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
