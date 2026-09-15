const passwordInput = document.getElementById("password");
const strengthDisplay = document.getElementById("strength");
const feedbackList = document.getElementById("feedback");
const generateBtn = document.getElementById("generateBtn");
const generatedPassword = document.getElementById("generatedPassword");
const copyBtn = document.getElementById("copyBtn");
const toggleVisibility = document.getElementById("toggleVisibility");
const themeToggle = document.getElementById("themeToggle");

// ========== Strength Checker ==========
function checkPasswordStrength(password) {
  let score = 0;
  const feedback = [];

  // Reset classes
  strengthDisplay.className = "strength-box";

  if (password.length === 0) {
    strengthDisplay.textContent = "Password strength will appear here";
    feedbackList.innerHTML = `
      <li>Use at least 12 characters</li>
      <li>Include uppercase and lowercase letters</li>
      <li>Include numbers</li>
      <li>Include special characters</li>
    `;
    return;
  }

  if (password.length >= 12) score += 1;
  else feedback.push("Use at least 12 characters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Include uppercase letters");

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Include lowercase letters");

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Include numbers");

  if (/[!@#$%^&*()_+\-=\[\]{}]/.test(password)) score += 1;
  else feedback.push("Include special characters");

  if (password.length >= 16) score += 1;

  // Update strength display + color
  if (score <= 1) {
    strengthDisplay.textContent = "🔴 Very Weak";
    strengthDisplay.classList.add("very-weak");
  } else if (score === 2) {
    strengthDisplay.textContent = "🟠 Weak";
    strengthDisplay.classList.add("weak");
  } else if (score === 3) {
    strengthDisplay.textContent = "🟡 Moderate";
    strengthDisplay.classList.add("moderate");
  } else if (score === 4) {
    strengthDisplay.textContent = "🟢 Strong";
    strengthDisplay.classList.add("strong");
  } else {
    strengthDisplay.textContent = "🟢 Very Strong";
    strengthDisplay.classList.add("very-strong");
  }

  // Update feedback
  feedbackList.innerHTML = "";
  if (feedback.length === 0) {
    feedbackList.innerHTML = "<li>Excellent! Your password meets all criteria.</li>";
  } else {
    feedback.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      feedbackList.appendChild(li);
    });
  }
}

// Live typing
passwordInput.addEventListener("input", () => {
  checkPasswordStrength(passwordInput.value);
});

// ========== Generator ==========
function secureRandomIndex(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}";
  const all = upper + lower + numbers + symbols;

  let password = "";
  password += upper[secureRandomIndex(upper.length)];
  password += lower[secureRandomIndex(lower.length)];
  password += numbers[secureRandomIndex(numbers.length)];
  password += symbols[secureRandomIndex(symbols.length)];

  for (let i = 0; i < 12; i++) {
    password += all[secureRandomIndex(all.length)];
  }

  // Shuffle
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  generatedPassword.textContent = password;
  passwordInput.value = password;
  checkPasswordStrength(password);

  // Show copy button
  copyBtn.style.display = "block";
}

generateBtn.addEventListener("click", generatePassword);

// ========== Copy to clipboard ==========
copyBtn.addEventListener("click", () => {
  const text = generatedPassword.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅";
    setTimeout(() => {
      copyBtn.textContent = "📋";
    }, 1500);
  });
});

// ========== Show / Hide password ==========
toggleVisibility.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleVisibility.textContent = isPassword ? "🙈" : "👁️";
});

// ========== Dark mode ==========
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}