const form = document.getElementById('registerForm');
const errorBox = document.getElementById('registerError');
const successBox = document.getElementById('registerSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Basic validation
  if (password !== confirmPassword) {
    errorBox.textContent = 'Passwords do not match.';
    errorBox.classList.add('show');
    successBox.classList.remove('show');
    return;
  }
  if (username.length < 3 || password.length < 4) {
    errorBox.textContent = 'Username must be at least 3 characters, password at least 4.';
    errorBox.classList.add('show');
    successBox.classList.remove('show');
    return;
  }

  // Simulate REST API POST /register
  // In a real app, this would be fetch('/register', { method: 'POST', body: JSON.stringify({ username, password }) })
  // For simplicity, store in localStorage
  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  if (users.find(u => u.username === username)) {
    errorBox.textContent = 'Username already exists.';
    errorBox.classList.add('show');
    successBox.classList.remove('show');
    return;
  }
  users.push({ username, password });
  localStorage.setItem('registeredUsers', JSON.stringify(users));

  // Success
  errorBox.classList.remove('show');
  successBox.classList.add('show');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});
