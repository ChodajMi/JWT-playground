const form = document.getElementById('loginForm');
const errorBox = document.getElementById('loginError');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate REST API GET /login or check credentials
  // First check registered users
  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  let user = users.find(u => u.username === username && u.password === password);

  // Fallback to hardcoded creds if no registered users or for demo
  if (!user && username === 'admin' && password === '1234') {
    user = { username };
  }

  if (user) {
    errorBox.classList.remove('show');
    const now = Math.floor(Date.now() / 1000);
    const payload = { username, iat: now, exp: now + 60 };
    const token = JWTUtils.generateToken(payload);

    localStorage.setItem('jwtToken', token);
    localStorage.setItem('tokenExpiry', payload.exp);

    window.location.href = 'playground.html';
  } else {
    errorBox.classList.add('show');
  }
});
