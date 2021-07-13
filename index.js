// list of all questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

currentQuestion = 0
userScore = 0
startBtn = document.querySelector('#start')
container = document.querySelector(".center")

function startQuiz(){
  //clear container
  container.innerHTML = ''

  // check to see if at end of quiz
  console.log(currentQuestion)
  if(currentQuestion === 4){
    console.log("here")
  }


  //create title
  var title = document.createElement('h2')
  title.textContent = questions[currentQuestion].title
  title.setAttribute('class', 'title')
  document.querySelector('.center').appendChild(title)

  //create buttons
  questions[currentQuestion].choices.forEach(el => {
    var button = document.createElement("button")
    button.setAttribute('class', 'answer')
    button.textContent = el
    button.addEventListener("click", checkAnswer)
    container.appendChild(button)
  })

}

function checkAnswer(event){
  //check answer and display if wrong or right
  var userAnswer = document.createElement("h3")

  if(event.target.textContent === questions[currentQuestion].answer){
    userAnswer.textContent = 'Correct!'
    userAnswer.setAttribute('class','.correct')
    container.appendChild(userAnswer)
    userScore++
  } else {
    userAnswer.textContent = 'Wrong!'
    userAnswer.setAttribute('class','wrong')
    container.appendChild(userAnswer)
  }
  // setTimeout(() => {
  //   startQuiz()
  // }, 1000);
  currentQuestion++
  startQuiz()
}


startBtn.addEventListener("click", startQuiz);