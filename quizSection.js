//a list of questions
const questions = [
    {
        question: "What is the purpose of 'My Block' in EV3 robotics?" ,
        answers: [
            {text: "To build physical structures with LEGO bricks", correct: false}, 
            {text: "To create custom commands or functions blocks", correct: true}, 
            {text: " To control the robot's movements", correct: false}, 
            {text: "To change the robot's color", correct: false}, 
        ]
    },
    {
        question: "How does 'My Block' help to make programming more simple?" ,
        answers: [
            {text: " By making programs more complex", correct: false}, 
            {text: "By reducing the number of available commands", correct: false}, 
            {text: "By grouping multiple commands into one custom block", correct: true}, 
            {text: "By limiting creativity", correct: false}, 
        ]
    },
    {
        question: "Can you modify a 'My Block' once it's created?" ,
        answers: [
            {text: "No, it's permanent", correct: false}, 
            {text: " Yes, but only once", correct: false}, 
            {text: "Yes, you can modify it anytime", correct: true}, 
            {text: "Yes, but only by an expert programmer", correct: false}, 
        ]
    },
    {
        question: "What happens if you delete a 'My Block' from your program?" ,
        answers: [
            {text: "It disappears forever", correct: true}, 
            {text: "It stays in the program but becomes inactive", correct: false}, 
            {text: "It turns into a standard block", correct: false}, 
            {text: "It cannot be deleted", correct: false}, 
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons"); //This is the damn problem why i got stuck: answerElement instead of answerButton.
const nextButton = document.getElementById("next-button");

// To keep track of the scores and start the questions
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0; //when start the quiz, the question 1
    score = 0;
    nextButton.innerHTML = 'Next'; //display teh next button once you select an asnwer
    showQuestion(); //calling the next question.
}

function showQuestion(){
    resetState();

    //display  the questions:
    let currentQuestion = questions[currentQuestionIndex]; //keep track of the questions: begin with question 1 and continue.
    
    let questionNumber = currentQuestionIndex + 1; //next question, computer will know that the 1st question it's answered

    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question; //replace the text in the HTML to the texts from the list.


    //displat the multiple questions asnwer texts
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //in the button:....
        button.innerHTML = answer.text; //get into the list: the answer element
        button.classList.add("btn");
        answerButton.appendChild(button); //Thios is to append a child element to an existing parent element
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){ //this function it's to remove the asnwers 1 answer 2 ... from the html
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){ //the amount of questions I have.
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
