//New Game Button
function newGame(){
  location.reload();
}


// Progress-Bar
const progress = document.getElementById("progress-actual");
let progressPercent = 0;

//Correct-PopUp
const correctPopup = document.getElementById("correct-pop-up");

//False-Popup
const falsePopup = document.getElementById("false-pop-up");
const questionContainer = document.getElementById("question-container");

//to Close False Popup
function closePopup() {
  falsePopup.style.visibility = "hidden";
  questionContainer.style.visibility = "visible";
}

//radio
const radio = document.getElementsByClassName("radio");

//Richtige Antwort
const popupRightAnswer = document.getElementById("false-p");

//Falsche Fragen und Antworten Array
let falseQuestions = [];
let answersToCorrect = [];

//Game Over Fragen und Antworten Auflisten
const gameOverParagraph = document.getElementById("game-over");
const gameOverContainer = document.getElementById("game-over-container");


// Fragen Array
var questions;
var askedQuestions = [];
let points = 0;
let falsePoints = 0;


//Nächste Frage und vorherige Frage 
function nextQuestion(){
  if(currentQuestionIndex < questions.length){
      currentQuestionIndex++;
    } 

    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    document.getElementById("source").innerText = currentQuestion.quelle;

    var optionsHtml = "";
    for (var i = 0; i < currentQuestion.options.length; i++) {
      optionsHtml +=
        '<input class="radio" type="radio" name="answer" value="' +
        currentQuestion.options[i] +
        '" onclick="selectAnswer(this)">  ' +
        currentQuestion.options[i] +
        "<br>";
    }
    document.getElementById("options").innerHTML = optionsHtml;
  }

  function previousQuestion(){
    if(currentQuestionIndex !== 0){
      currentQuestionIndex--;
    } 

    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    document.getElementById("source").innerText = currentQuestion.quelle;

    var optionsHtml = "";
    for (var i = 0; i < currentQuestion.options.length; i++) {
      optionsHtml +=
        '<input class="radio" type="radio" name="answer" value="' +
        currentQuestion.options[i] +
        '" onclick="selectAnswer(this)">  ' +
        currentQuestion.options[i] +
        "<br>";
    }
    document.getElementById("options").innerHTML = optionsHtml;
    progressPercent = progressPercent - 2.5;
    progress.style.width = progressPercent + "%";
  }
  



//Data fetch
fetch("fragen.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    shuffleQuestions();
  })
  .catch((error) => console.error("Error fetching questions:", error));

var currentQuestionIndex = 0;
var selectedAnswer = null;

function shuffleQuestions() {
  askedQuestions = []; // Zurücksetzen der gestellten Fragen beim Mischen
  questions = shuffleArray(questions);
  currentQuestionIndex = 0;
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    //später nur 40 Fragen
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    document.getElementById("source").innerText = currentQuestion.quelle;
    progressPercent = progressPercent + 2.5;
    // console.log(progressPercent);
    progress.style.width = progressPercent + "%";
    var optionsHtml = "";
    for (var i = 0; i < currentQuestion.options.length; i++) {
      optionsHtml +=
        '<input class="radio" type="radio" name="answer" value="' +
        currentQuestion.options[i] +
        '" onclick="selectAnswer(this)">  ' +
        currentQuestion.options[i] +
        "<br>";
    }
    document.getElementById("options").innerHTML = optionsHtml;
  } else {
    //alert("Game over!");
    gameOverContainer.style.visibility = "visible";
  }
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
      // alert("Richtig!");
      correctPopup.style.visibility = "visible"; //macht den Popup div visible
      setTimeout(() => {
        //schaltet den Popup div in eine sekunde aus
        correctPopup.style.visibility = "hidden";
      }, 1000);

      points++;
      console.log(points);
      //document.getElementById("points").innerText = "Punktzahl: " + points;
    } else {
      //Wenn Antwort Falsch ist
      falsePopup.style.visibility = "visible";
      //questionContainer.style.visibility = "hidden";
      questionContainer.style.visibility = "hidden";
      popupRightAnswer.textContent =
        "Die richtige Antwort ist: " + currentQuestion.correctAnswer;

      
      let q = currentQuestion.question;
      let a = currentQuestion.correctAnswer;

      
      console.log(q);
      console.log(a);

      falseQuestions.push(q);
      answersToCorrect.push(a);

      console.log(falseQuestions);
      console.log(answersToCorrect);
      

      let gameOverFalseAnswers = "";

      for(let i = 0; i < falseQuestions.length; i++){
        for(let j = 0; j < answersToCorrect.length; j++){
          
        }
        gameOverFalseAnswers += '<p>' + falseQuestions[i]  + answersToCorrect[i] + '</p><br>';
      }
      gameOverParagraph.innerHTML = gameOverFalseAnswers;

      falsePoints--;
    }

    //var currentQuestion = questions[currentQuestionIndex];

    //let q = questions[currentQuestionIndex].question;

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

// if ((falsePopup.style.visibility = "visible")) {
//   questionContainer.style.visibility = "hidden";
// }

//if (falsePopup.style.visibility == "hidden") {
showQuestion();
//}
