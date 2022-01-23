// Variables
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-btn");
var firstpageContainerEL = document.querySelector(".firstpage-container");
var questionContainerEl = document.querySelector(".quiz-container");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answer-btns");
var responseEl = document.querySelector("#response");
var highscoreEl = document.querySelector(".quiz-highscore");
var finalScoreEl = document.querySelector("#highscore-text");
var submitButtonEl = document.querySelector("#highscore-btn");
var errorMsg = document.querySelector("#erroMsg");
var finalHighscoreEl = document.querySelector(".finalpage-highscore");

// Variable Declarations
let currentQuestionIndex = 0;
var timeLeft = 75;
var timeInterval;
// var highscores = [];
var score = 0;

// Quiz Questions Object
var questions = [
    {
        question: "Commonly used data types DO not include:",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    },
    {
        question: "The condition in an if/else statement us enclosed with _______.",
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "parenthesis", correct: true },
            { text: "square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ]
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parenthesis", correct: false }
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "Javascript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console log", correct: true }
        ]
    }
];
startButtonEl.addEventListener("click", startGame)

// Function that happens when the start quiz button is clicked and presents the questions
function startGame() {
    firstpageContainerEL.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    setQuizQuestion();
    countdownTimer();
};

// Timer Function that starts when the "start button is clicked"
function countdownTimer() {
    timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = ' ';
            clearInterval(timeInterval);
            alert("TIMES UP!!");
        }
    }, 1000);
};

function setQuizQuestion() {

    if (currentQuestionIndex < questions.length) {
        resetQuiz();
        showQuestion(questions[currentQuestionIndex]);
    } else {
      endQuiz();
    }
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button"); //create button for each answer
        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) { // check if answers:correct = true
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerEl.appendChild(button);
    })
};

function resetQuiz() {
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild);
    }
};

function selectAnswer() {
    var selectedButton = this.dataset.correct;

    // if correct: true, then display "Correct"
    if (selectedButton === "true") {
        timeLeft = timeLeft;
        responseEl.setAttribute("style", "color:green");
        responseEl.textContent = "Correct!"
        score = score + 10;
    } else {
        responseEl.setAttribute("style", "color:red");
        responseEl.textContent = "Incorrect";
        timeLeft = timeLeft - 10;
    }

    currentQuestionIndex++;
    setQuizQuestion();

};

// Function to end the quiz and display results 
function endQuiz() {
    questionContainerEl.classList.add("hide");
    responseEl.classList.add("hide");
    // highscoreEl.classList.remove("hide");
    clearInterval(timeInterval);
    displayResults();
};

// Displays users final score and stores highscore 
function displayResults() {
    highscoreEl.classList.remove("hide");
    
    var highscores = score;
    localStorage.getItem(highscores);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + highscores;
    finalScoreEl.appendChild(finalScore);
    localStorage.setItem("Highscores", JSON.stringify(highscores));
};

// Event listener to store initials 
document.addEventListener("submit", function(event){
    event.preventDefault();
    var yourInitials = document.querySelector("#input-initials");
    localStorage.setItem("Initials", yourInitials.value);

    finalPage();

});

// function to get highscore and initials from localStorage and display them to user
function finalPage() {
    var yourScore = localStorage.getItem("Highscores");
    var yourInitial = localStorage.getItem("Initials");

    if (yourScore && yourInitial === "") {
        return;
    }

    finalHighscoreEl.classList.remove("hide");
    var initialAndScore = document.querySelector("#input-initials-readonly");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;

    highscoreEl.classList.add("hide");
};

// Function to reload the page when the "Go back" button is clicked 
function init() {
    location.reload();
};





