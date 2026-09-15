// Get DOM elements (matching your actual HTML IDs)
const passwordInput = document.getElementById("password");
const strengthDisplay = document.getElementById("strength");
const feedbackList = document.getElementById("feedback");
const generateBtn = document.getElementById("generateBtn");
const generatedPassword = document.getElementById("generatedPassword");

// ========== Password Strength Checker ==========
function checkPasswordStrength(password) {
  let score = 0;
  const feedback = [];

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
passwordInput.addEventListener("input", () => {
  checkPasswordStrength(passwordInput.value);
});

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

  // Shuffle so the guaranteed characters aren’t always first
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  // Show the generated password
  generatedPassword.textContent = password;

  // Also put it in the input and update strength
  passwordInput.value = password;
  checkPasswordStrength(password);
}

// Button click
generateBtn.addEventListener("click", generatePassword);