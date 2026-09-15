// Get DOM elements
const passwordInput = document.getElementById("password");          // adjust ID if different
const strengthDisplay = document.getElementById("strengthDisplay"); // adjust ID if different
const feedbackList = document.getElementById("feedbackList");       // adjust ID if different
const generateBtn = document.getElementById("generateBtn");         // adjust ID if different
const generatedPassword = document.getElementById("generatedPassword"); // or reuse passwordInput

// ========== Password Strength Checker ==========
function checkPasswordStrength(password) {
  let score = 0;
  const feedback = [];

  if (password.length === 0) {
    strengthDisplay.textContent = "Password strength will appear here";
    feedbackList.innerHTML = "";
    return;
  }

  // Length
  if (password.length >= 12) score += 1;
  else feedback.push("Use at least 12 characters");

  // Uppercase
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Include uppercase letters");

  // Lowercase
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Include lowercase letters");

  // Numbers
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Include numbers");

  // Symbols
  if (/[!@#$%^&*()_+\-=\[\]{}]/.test(password)) score += 1;
  else feedback.push("Include special characters");

  // Extra points for longer passwords
  if (password.length >= 16) score += 1;

  // Display strength
  if (score <= 1) {
    strengthDisplay.textContent = "🔴 Very Weak";
  } else if (score === 2) {
    strengthDisplay.textContent = "🟠 Weak";
  } else if (score === 3) {
    strengthDisplay.textContent = "🟡 Moderate";
  } else if (score === 4) {
    strengthDisplay.textContent = "🟢 Strong";
  } else {
    strengthDisplay.textContent = "🟢 Very Strong";
  }

  // Display feedback
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

// Live checking while typing
if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    checkPasswordStrength(passwordInput.value);
  });
}

// ========== Secure Password Generator ==========
function secureRandomIndex(max) {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);
  return randomValues[0] % max;
}

function generatePassword() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers   = "0123456789";
  const symbols   = "!@#$%^&*()_+-=[]{}";

  const allCharacters = uppercase + lowercase + numbers + symbols;

  let password = "";

  // Guarantee at least one of each type
  password += uppercase[secureRandomIndex(uppercase.length)];
  password += lowercase[secureRandomIndex(lowercase.length)];
  password += numbers[secureRandomIndex(numbers.length)];
  password += symbols[secureRandomIndex(symbols.length)];

  // Add 12 more random characters (total length = 16)
  for (let i = 0; i < 12; i++) {
    password += allCharacters[secureRandomIndex(allCharacters.length)];
  }

  // Shuffle the password so the guaranteed characters aren’t always at the front
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  // Show it
  if (generatedPassword) {
    generatedPassword.textContent = password;
  }
  if (passwordInput) {
    passwordInput.value = password;
    checkPasswordStrength(password); // also update the strength meter
  }
}

// Button click
if (generateBtn) {
  generateBtn.addEventListener("click", generatePassword);
}