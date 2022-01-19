// Variables
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-btn");
var firstpageContainerEL = document.querySelector(".firstpage-container");
var questionContainerEl = document.querySelector(".quiz-container");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answer-btns");

// Variable Declarations
let randomQuestions, currentQuestionIndex;
var timeLeft = 75;
var timeInterval;
var highscores = [];
var score = 0;

startButtonEl.addEventListener("click", startGame)

function startGame() {
    firstpageContainerEL.classList.add("hide");
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    setQuizQuestion();
    countdownTimer();
};

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
    resetQuiz();
    showQuestion(randomQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
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

function selectAnswer(event) {
    var selectedButton = event.target;
    var correctAnswer = selectedButton.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerEl.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    });

    if(randomQuestions.length > currentQuestionIndex + 1) {

    } else {
        // show highscore
    }
};

function setStatus(element, correct) {
    clearSetStatus(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

function clearSetStatus(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

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
        question: "A very useful took used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "Javascript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console log", correct: true }
        ]
    }
];