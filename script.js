
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Load saved theme from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", toggleDarkMode);
});

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Simplified Flashcard Logic
const hiragana = [
    { front: "あ", back: "a" }, { front: "い", back: "i" }
];
const katakana = [
    { front: "ア", back: "a" }, { front: "イ", back: "i" }
];
const hiraganaWords = [
    { front: "さくら", back: "sakura" }
];
const katakanaWords = [
    { front: "テレビ", back: "terebi" }
];

let currentSet = [];
let currentCardIndex = 0;

function startMode(mode) {
    const allCards =
        mode === "hiragana" ? hiragana :
        mode === "katakana" ? katakana :
        mode === "hiraganaWords" ? hiraganaWords : katakanaWords;
    currentSet = allCards.sort(() => Math.random() - 0.5).slice(0, 10);
    currentCardIndex = 0;
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("flashcard-container").style.display = "block";
    document.getElementById("results").style.display = "none";
    showCard();
    updateCounter();
}

function showCard() {
    const card = currentSet[currentCardIndex];
    const flashcard = document.querySelector(".flashcard");
    flashcard.classList.remove("flipped");
    flashcard.querySelector(".front").textContent = card.front;
    flashcard.querySelector(".back").textContent = card.back;
}

function flipCard() {
    const flashcard = document.querySelector(".flashcard");
    flashcard.classList.toggle("flipped");
}

function markAnswer(isCorrect) {
    if (currentCardIndex < currentSet.length - 1) {
        currentCardIndex++;
        showCard();
        updateCounter();
    } else {
        showResults();
    }
}

function updateCounter() {
    document.getElementById("counter").textContent = `${currentCardIndex + 1}/10`;
}

function showResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    document.getElementById("flashcard-container").style.display = "none";
    resultsDiv.innerHTML = `
        <h3>Set Complete</h3>
        <button onclick="startMode('hiragana')">Next Hiragana Set</button>
        <button onclick="startMode('katakana')">Next Katakana Set</button>
        <button onclick="startMode('hiraganaWords')">Next Hiragana Words Set</button>
        <button onclick="startMode('katakanaWords')">Next Katakana Words Set</button>
        <button onclick="document.getElementById('mode-selection').style.display = 'block'; document.getElementById('results').style.display = 'none';">Back to Mode Selection</button>
    `;
}
