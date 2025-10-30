const countdownDisplay = document.getElementById('countdown');
const timerDisplay = document.getElementById('timerDisplay');
const fullTokenDisplay = document.getElementById('fullToken');
const decodeBtn = document.getElementById('decodeBtn');
const validateBtn = document.getElementById('validateBtn');
const logoutBtn = document.getElementById('logoutBtn');
const statusDisplay = document.getElementById('statusDisplay');
const decodedDisplay = document.getElementById('decodedDisplay');

let countdownInterval;
const token = localStorage.getItem('jwtToken');
const expiry = parseInt(localStorage.getItem('tokenExpiry'), 10);

if (!token || !expiry) {
  window.location.href = 'login.html';
}

displayToken(token);
startCountdown(expiry);

function displayToken(token) {
  const parts = token.split('.');
  fullTokenDisplay.innerHTML = `
    <span class="token-header">${parts[0]}</span>.
    <span class="token-payload">${parts[1]}</span>.
    <span class="token-signature">${parts[2]}</span>
  `;
}

function startCountdown(expiryTime) {
  countdownInterval = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    const remaining = expiryTime - now;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = '0';
      timerDisplay.classList.add('expired');
      setTimeout(() => logout(), 2000);
    } else {
      countdownDisplay.textContent = remaining;
    }
  }, 1000);
}

decodeBtn.onclick = () => {
  try {
    const decoded = JWTUtils.decodeToken(token);
    decodedDisplay.innerHTML = `
      <pre>${JSON.stringify(decoded.payload, null, 2)}</pre>
    `;
  } catch {
    decodedDisplay.innerHTML = `<div class="status invalid">Error decoding token</div>`;
  }
};

validateBtn.onclick = () => {
  const validation = JWTUtils.validateToken(token);
  statusDisplay.innerHTML = `
    <div class="status ${validation.valid ? 'valid' : 'invalid'}">${validation.reason}</div>
  `;
};

logoutBtn.onclick = logout;

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
