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
  window.location.href = "https://section-a-site-final.vercel.app/";
};

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

// Add this style to the document
const style = document.createElement('style');
style.textContent = `
@keyframes star-fall {
  0% { opacity: 0.8; transform: translateY(-40px) scaleX(0.7) rotate(-10deg);}
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateY(100vh) scaleX(1) rotate(10deg);}
}`;
document.head.appendChild(style);
