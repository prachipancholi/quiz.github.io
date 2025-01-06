const questions = [
    {
        question: "Whom Prachi loves the most? ",
        answers: [
            { text: "Prachi", correct: "false" },
            { text: "Jaya", correct: "false" },
            { text: "Yogesh", correct: "false" },
            { text: "Jay", correct: "true" },

        ]
    },
    {
        question: "Whom will Prachi marry? ",
        answers: [
            { text: "No one", correct: "false" },
            { text: "God", correct: "false" },
            { text: "God Knows", correct: "false" },
            { text: "Jay", correct: "true" },

        ]
    },
    {
        question: "With whom Prachi wants to go to mountains ?",
        answers: [
            { text: "No one", correct: "false" },
            { text: "Rashi", correct: "false" },
            { text: "Rajat", correct: "false" },
            { text: "Jay", correct: "true" },

        ]
    },
    {
        question: "You are my everything babe!",
        answers: [
            { text: "True", correct: "true" },
            { text: "False", correct: "false" },
            { text: "maybe", correct: "false" },
            { text: "canbe", correct: "false" },

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        score = score + 1;
        selectBtn.classList.add("correct");
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});




startQuiz();
