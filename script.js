
const hiragana = [
    { front: "あ", back: "a" }, { front: "い", back: "i" }, { front: "う", back: "u" },
    { front: "え", back: "e" }, { front: "お", back: "o" }, { front: "か", back: "ka" },
    { front: "き", back: "ki" }, { front: "く", back: "ku" }, { front: "け", back: "ke" },
    { front: "こ", back: "ko" }, { front: "さ", back: "sa" }, { front: "し", back: "shi" },
    { front: "す", back: "su" }, { front: "せ", back: "se" }, { front: "そ", back: "so" },
    { front: "た", back: "ta" }, { front: "ち", back: "chi" }, { front: "つ", back: "tsu" },
    { front: "て", back: "te" }, { front: "と", back: "to" }, { front: "な", back: "na" },
    { front: "に", back: "ni" }, { front: "ぬ", back: "nu" }, { front: "ね", back: "ne" },
    { front: "の", back: "no" }, { front: "は", back: "ha" }, { front: "ひ", back: "hi" },
    { front: "ふ", back: "fu" }, { front: "へ", back: "he" }, { front: "ほ", back: "ho" },
    { front: "ま", back: "ma" }, { front: "み", back: "mi" }, { front: "む", back: "mu" },
    { front: "め", back: "me" }, { front: "も", back: "mo" }, { front: "や", back: "ya" },
    { front: "ゆ", back: "yu" }, { front: "よ", back: "yo" }, { front: "ら", back: "ra" },
    { front: "り", back: "ri" }, { front: "る", back: "ru" }, { front: "れ", back: "re" },
    { front: "ろ", back: "ro" }, { front: "わ", back: "wa" }, { front: "を", back: "wo" },
    { front: "ん", back: "n" }
];

const katakana = [
    { front: "ア", back: "a" }, { front: "イ", back: "i" }, { front: "ウ", back: "u" },
    { front: "エ", back: "e" }, { front: "オ", back: "o" }, { front: "カ", back: "ka" },
    { front: "キ", back: "ki" }, { front: "ク", back: "ku" }, { front: "ケ", back: "ke" },
    { front: "コ", back: "ko" }, { front: "サ", back: "sa" }, { front: "シ", back: "shi" },
    { front: "ス", back: "su" }, { front: "セ", back: "se" }, { front: "ソ", back: "so" },
    { front: "タ", back: "ta" }, { front: "チ", back: "chi" }, { front: "ツ", back: "tsu" },
    { front: "テ", back: "te" }, { front: "ト", back: "to" }, { front: "ナ", back: "na" },
    { front: "ニ", back: "ni" }, { front: "ヌ", back: "nu" }, { front: "ネ", back: "ne" },
    { front: "ノ", back: "no" }, { front: "ハ", back: "ha" }, { front: "ヒ", back: "hi" },
    { front: "フ", back: "fu" }, { front: "ヘ", back: "he" }, { front: "ホ", back: "ho" },
    { front: "マ", back: "ma" }, { front: "ミ", back: "mi" }, { front: "ム", back: "mu" },
    { front: "メ", back: "me" }, { front: "モ", back: "mo" }, { front: "ヤ", back: "ya" },
    { front: "ユ", back: "yu" }, { front: "ヨ", back: "yo" }, { front: "ラ", back: "ra" },
    { front: "リ", back: "ri" }, { front: "ル", back: "ru" }, { front: "レ", back: "re" },
    { front: "ロ", back: "ro" }, { front: "ワ", back: "wa" }, { front: "ヲ", back: "wo" },
    { front: "ン", back: "n" }
];

let currentMode = [];
let currentSet = [];
let currentCardIndex = 0;
let wrongAnswers = [];
let correctCount = 0;

function startMode(mode) {
    currentMode = mode === "hiragana" ? [...hiragana] : [...katakana];
    generateSet();
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("flashcard-container").style.display = "block";
    document.getElementById("results").style.display = "none";
    correctCount = 0;
    showCard(currentCardIndex);
    updateCounter();
}

function generateSet() {
    currentSet = currentMode.sort(() => Math.random() - 0.5).slice(0, 10);
    currentCardIndex = 0;
    wrongAnswers = [];
}

function showCard(index) {
    const card = currentSet[index];
    const front = document.querySelector(".flashcard .front");
    const back = document.querySelector(".flashcard .back");
    front.textContent = card.front;
    back.textContent = "";
    document.querySelector(".flashcard").classList.remove("flipped");
}

function flipCard() {
    const back = document.querySelector(".flashcard .back");
    back.textContent = currentSet[currentCardIndex].back;
    document.querySelector(".flashcard").classList.add("flipped");
}

function markAnswer(isCorrect) {
    if (!isCorrect) wrongAnswers.push(currentSet[currentCardIndex]);
    correctCount += isCorrect ? 1 : 0;

    if (currentCardIndex === currentSet.length - 1) {
        showResults();
        return;
    }

    currentCardIndex++;
    showCard(currentCardIndex);
    updateCounter();
}

function updateCounter() {
    document.getElementById("counter").textContent = `${currentCardIndex + 1}/10`;
}

function showResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    document.getElementById("flashcard-container").style.display = "none";

    const wrongList = wrongAnswers.map(
        card => `<div>${card.front} - ${card.back}</div>`
    ).join("");

    resultsDiv.innerHTML = `
        <h3>Results</h3>
        <p>Correct: ${correctCount}</p>
        <p>Incorrect: ${wrongAnswers.length}</p>
        <div>${wrongList}</div>
        <button onclick="generateSet(); document.getElementById('flashcard-container').style.display = 'block'; document.getElementById('results').style.display = 'none'; showCard(0); updateCounter();">Next Set</button>
    `;
}
