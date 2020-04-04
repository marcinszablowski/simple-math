const a = document.getElementById("a")
const b = document.getElementById("b");
const operation = document.getElementById("operation");
const form = document.getElementById("form");
const answer = document.getElementById("answer");
const isCorrect = document.getElementById("is-correct");
let correctCount = document.getElementById("correct-count");
let wrongCount = document.getElementById("wrong-count");
let strikeCount = document.getElementById("strike-count");
let topCount = document.getElementById("high-score");
const menuItems = document.getElementsByClassName("menu-item");
const menu = document.getElementById("menu");
let correctPoints = 0;
let wrongPoints = 0;
let strikePoints = 0;
let topScore = localStorage.getItem("highScore");
let min = 0;
let max = 99;
let numA = parseFloat(((Math.random() * (max - min) + min)).toFixed(2));
let numB = parseFloat(((Math.random() * (max - min) + min)).toFixed(2));
let currentOperation = "sum";
let currentSymbol = "+"
operation.innerHTML = currentOperation;



menu.addEventListener("click", function (e) {
  for (const el of menuItems) {
    el.classList.remove("active");
  }
  if (e.toElement.dataset.item == "li") {
    e.target.classList.add("active");
  }
  if (e.target.innerHTML == "Dodawanie") {
    currentOperation = "sum";
  }
  if (e.target.innerHTML == "Odejmowanie") {
    currentOperation = "substraction";
  }
  if (e.target.innerHTML == "Mnożenie") {
    currentOperation = "multiplication";
    max = 50;
  }
  if (e.target.innerHTML == "Dzielenie") {
    currentOperation = "division";
    max = 20;
  }

  isCorrect.innerHTML = "";
  showNewNumbers();

})

function logSubmit(e) {
  e.preventDefault();
}

function highScore() {
  topCount.innerHTML = localStorage.getItem("highScore");
  if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", 0);
  }
  if (strikePoints >= localStorage.getItem("highScore")) {
    localStorage.setItem("highScore", strikePoints);
    strikeCount.innerHTML = strikePoints;
    topCount.innerHTML = strikePoints
  }
}

function check() {
  let sum = parseFloat((numA + numB).toFixed(2));
  let substraction = parseFloat((numA - numB).toFixed(2));
  let multiplication = parseFloat((numA * numB).toFixed(2));
  let division = parseFloat((numA / numB).toFixed(2));
  let total = 0;
  if (currentOperation == "sum") {
    total = sum
  }
  if (currentOperation == "substraction") {
    total = substraction
  }
  if (currentOperation == "multiplication") {
    total = multiplication
  }
  if (currentOperation == "division") {
    total = division;
  }

  console.log(total);
  highScore();

  if (answer.value == sum && currentOperation == "sum" ||
    answer.value == substraction && currentOperation == "substraction" ||
    answer.value == multiplication && currentOperation == "multiplication" ||
    answer.value == division && currentOperation == "division") {

    answer.value = "";
    isCorrect.innerHTML = `Dobrze! ${numA} ${currentSymbol} ${numB} = ${total} 🧠`;
    showNewNumbers();
    correctPoints++;
    strikePoints++;
    updateScore();
    highScore();
  } else {
    isCorrect.innerHTML = "Źle 🦄"
    wrongPoints++;
    strikePoints = 0;
    updateScore();
    highScore();
  }

}

function showNewNumbers() {
  if (currentOperation == "sum" || currentOperation == "substraction") {
    numA = parseFloat(((Math.random() * (max - min) + min)).toFixed(2));
    numB = parseFloat(((Math.random() * (max - min) + min)).toFixed(2));
  }

  if (currentOperation == "multiplication" || currentOperation == "division") {
    numA = parseInt(Math.random() * (max - min) + min);
    numB = parseInt(Math.random() * (max - min) + min);
  }

  a.innerHTML = numA;
  b.innerHTML = numB;

  if (currentOperation == "sum") {
    operation.innerHTML = "+";
    currentSymbol = "+";
  }
  if (currentOperation == "substraction") {
    operation.innerHTML = "-";
    currentSymbol = "-";
  }
  if (currentOperation == "multiplication") {
    operation.innerHTML = "*";
    currentSymbol = "*"
  }
  if (currentOperation == "division") {
    operation.innerHTML = "/";
    currentSymbol = "/";
  }

}

function updateScore() {
  correctCount.innerHTML = correctPoints;
  wrongCount.innerHTML = wrongPoints;
  strikeCount.innerHTML = strikePoints;
}

showNewNumbers();
updateScore();
highScore();

form.addEventListener("submit", logSubmit);
form.addEventListener("submit", check);