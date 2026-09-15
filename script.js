const passwordInput = document.getElementById("password");
const strengthDisplay = document.getElementById("strength");
const feedbackList = document.getElementById("feedback");

passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {
    const password = passwordInput.value;
    let score = 0;
    let feedback = [];

    // Length check
    if (password.length >= 12) {
        score++;
    } else {
        feedback.push("Use at least 12 characters.");
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        feedback.push("Add lowercase letters.");
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        feedback.push("Add uppercase letters.");
    }

    // Number check
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        feedback.push("Add numbers.");
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    } else {
        feedback.push("Add special characters such as !, @, # or $.");
    }

    // Common weak patterns
    const weakPatterns = [
        "password",
        "123456",
        "12345678",
        "qwerty",
        "admin",
        "letmein"
    ];

    if (
        weakPatterns.some(pattern =>
            password.toLowerCase().includes(pattern)
        )
    ) {
        score = Math.max(0, score - 2);
        feedback.push("Avoid common or predictable passwords.");
    }

    // Display result
    if (password.length === 0) {
        strengthDisplay.textContent =
            "Password strength will appear here";
    } else if (score <= 1) {
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

    if (feedback.length === 0 && password.length > 0) {
        feedbackList.innerHTML =
            "<li>Excellent! Your password meets all basic strength requirements.</li>";
    } else {
        feedback.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            feedbackList.appendChild(li);
        });
    }
}const generateBtn = document.getElementById("generateBtn");
const generatedPassword = document.getElementById("generatedPassword");

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}";
    
    const allCharacters =
        uppercase + lowercase + numbers + symbols;

    let password = "";

    // Guarantee a mix of character types
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Add additional random characters
    for (let i = 0; i < 12; i++) {
        password += allCharacters[
            Math.floor(Math.random() * allCharacters.length)
        ];
    }

    generatedPassword.textContent = password;
}
