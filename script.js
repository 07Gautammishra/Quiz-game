const startScreen=document.getElementById("start-screen");
const quizScreen=document.getElementById("quiz-screen");
const resultScreen= document.getElementById("results-screen");
const startButton= document.getElementById("start-btn");
const questionText= document.getElementById("question-text");
const answersContainer= document.getElementById("ans-container");
const currentQuestionSpan= document.getElementById("current-question");
const totalQuestionSpan=document.getElementById("total-question");
const scoreSpan=document.getElementById("score");
const finalScore= document.getElementById("final-scored");
const maxScroreSpan=document.getElementById("max-scored");
const resultMessage=document.getElementById("results-message");
const restartButton=document.getElementById("restart-Quiz");
const progressBar=document.getElementById("progress");

const quizChangingRate=800;//in ms
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
  question: "Who developed the theory of relativity?",
  answers: [
    { text: "Isaac Newton", correct: false },
    { text: "Albert Einstein", correct: true },
    { text: "Nikola Tesla", correct: false },
    { text: "Galileo Galilei", correct: false },
  ],
},
{
  question: "Which data structure uses FIFO (First In First Out)?",
  answers: [
    { text: "Stack", correct: false },
    { text: "Queue", correct: true },
    { text: "Tree", correct: false },
    { text: "Graph", correct: false },
  ],
},
{
  question: "What does HTML stand for?",
  answers: [
    { text: "Hyper Trainer Marking Language", correct: false },
    { text: "Hyper Text Markup Language", correct: true },
    { text: "High Text Markup Language", correct: false },
    { text: "Hyper Text Marketing Language", correct: false },
  ],
},
{
  question: "Which country is known as the Land of the Rising Sun?",
  answers: [
    { text: "China", correct: false },
    { text: "South Korea", correct: false },
    { text: "Japan", correct: true },
    { text: "Thailand", correct: false },
  ],
},
{
  question: "Which keyword is used to declare a constant in JavaScript?",
  answers: [
    { text: "var", correct: false },
    { text: "let", correct: false },
    { text: "const", correct: true },
    { text: "static", correct: false },
  ],
},
{
  question: "What is the time complexity of binary search?",
  answers: [
    { text: "O(n)", correct: false },
    { text: "O(log n)", correct: true },
    { text: "O(n log n)", correct: false },
    { text: "O(1)", correct: false },
  ],
},
{
  question: "Which gas do plants absorb from the atmosphere?",
  answers: [
    { text: "Oxygen", correct: false },
    { text: "Nitrogen", correct: false },
    { text: "Carbon Dioxide", correct: true },
    { text: "Hydrogen", correct: false },
  ],
},
];


let currentIndex=0;
let score=0;
let ansDisabled=false;

totalQuestionSpan.textContent=quizQuestions.length;
maxScroreSpan.textContent=quizQuestions.length

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz() {
    // reset var
    currentIndex=0;
    score=0;
    scoreSpan.textContent=score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active")
    showQuestion()
}
function restartQuiz() {
    startQuiz()
    resultScreen.classList.remove("active");
}
function showQuestion(){
    // reset state
    ansDisabled=false;
    const currentQuestion= quizQuestions[currentIndex];
     currentQuestionSpan.textContent= currentIndex+1;
    
     const progressPercent= currentIndex/quizQuestions.length *100;
     progressBar.style.width=progressPercent+"%";

     questionText.textContent=quizQuestions[currentIndex].question;
     answersContainer.innerHTML="";
    currentQuestion.answers.forEach(ans => {
        const button=document.createElement("button");
        button.textContent=ans.text;
        button.classList.add("ans-btn");
        button.dataset.correct=ans.correct;
        button.addEventListener("click", selectAns);

        answersContainer.append(button);
    })
}

function selectAns(event) {
    if (ansDisabled) return;
    ansDisabled = true;

    const selectBtn = event.target;
    const isRight = selectBtn.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectBtn) {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    if (isRight) {
        score++;
        scoreSpan.innerText = score;
    }

    setTimeout(() => {
        currentIndex++;
        if (currentIndex < quizQuestions.length) {
            showQuestion();
        }else{
            showResult();
        }
    }, quizChangingRate);
}

function showResult(){
    progressBar.style.width="100%"
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScore.textContent=score;
    const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

