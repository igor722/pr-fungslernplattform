var questions;
var askedQuestions = [];
let points = 0;

fetch("fragen.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    showQuestion();
  })
  .catch((error) => console.error("Error fetching questions:", error));

var currentQuestionIndex = 0;
var selectedAnswer = null;

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    document.getElementById("source").innerText = currentQuestion.quelle;

    var optionsHtml = "";
    for (var i = 0; i < currentQuestion.options.length; i++) {
      optionsHtml +=
        '<input type="radio" name="answer" value="' +
        currentQuestion.options[i] +
        '" onclick="selectAnswer(this)">  ' +
        currentQuestion.options[i] +
        "<br>";
    }
    document.getElementById("options").innerHTML = optionsHtml;
  } else {
    alert("Quiz beendet!");
  }
}

function shuffleQuestions() {
  askedQuestions = []; // Zurücksetzen der gestellten Fragen beim Mischen
  questions = shuffleArray(questions);
  currentQuestionIndex = 0;
  showQuestion();
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function selectAnswer(element) {
  selectedAnswer = element.value;
}

function checkAnswer() {
  if (selectedAnswer !== null) {
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      alert("Richtig!");
      points++;
      document.getElementById("points").innerText = "Punktzahl: " + points;
    } else {
      alert(
        "Falsch. Die richtige Antwort ist: " + currentQuestion.correctAnswer
      );
    }

    askedQuestions.push(currentQuestion); // Füge die gestellte Frage zum Array hinzu

    // Nächste nicht gestellte Frage anzeigen
    do {
      currentQuestionIndex++;
    } while (
      currentQuestionIndex < questions.length &&
      askedQuestions.includes(questions[currentQuestionIndex])
    );

    showQuestion();
    selectedAnswer = null;
  } else {
    alert("Bitte wähle eine Antwort aus!");
  }
}

showQuestion();
