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

var currentQuestion = 0
var userScore = 0
var time = 60
let timer;
var startBtn = document.querySelector('#start')
var container = document.querySelector(".center")
var users = JSON.parse(localStorage.getItem('users')) || []

function countdown(){
  timer = setInterval(() => {
      if(time <= 0){
        container.textContent = ''
        var text = document.createElement('h2')
        text.textContent = 'GAME OVER'
  
        var restart = document.createElement('button')
        restart.textContent = 'restart'
        restart.setAttribute('class', 'restart')
        restart.addEventListener('click', reload)
  
        container.appendChild(text)
        container.appendChild(restart)
        document.querySelector('#time').textContent = `TIMES UP ${time}`
        clearInterval(timer)
      } else {
        document.querySelector('#time').textContent = `Time: ${time}`
        console.log(time)
        time--
      }
  }, 1000);
}

function startQuiz(){
  //clear container
  container.innerHTML = ''

  // check to see if at end of quiz
  console.log(currentQuestion)
  if(currentQuestion === 4){
    highscore()
  } else {
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
    time = time - 10
    userAnswer.textContent = 'Wrong!'
    userAnswer.setAttribute('class','wrong')
    container.appendChild(userAnswer)
  }
  setTimeout(() => {
    startQuiz()
  }, 1000);
  currentQuestion++
  // startQuiz()
}

function highscore(){
  clearInterval(timer)
  container.innerHTML = ''
  var title = document.createElement("h3")
  title.textContent = 'All Done!'

  var finalScore = document.createElement('h2')
  finalScore.textContent = `Your final score: ${userScore}`

  var userInput = document.createElement('h2')
  userInput.setAttribute('class', 'userTitle')
  userInput.textContent = 'Enter Your Initials: '

  var inputContainer = document.createElement('div')
  var input = document.createElement('input')
  input.setAttribute('id', 'textarea')
  inputContainer.appendChild(input)
  var button = document.createElement("Button")
  button.textContent = "Submit"
  button.setAttribute('id','input')
  button.addEventListener('click', setHighScore)
  inputContainer.setAttribute('class','input')
  inputContainer.appendChild(button)
  
  container.appendChild(title)
  container.appendChild(finalScore)
  container.appendChild(userInput)
  container.appendChild(inputContainer)
}

function setHighScore(event){
  userInitals = document.querySelector('#textarea').value
  if(userInitals === ''){
    alert('Please enter a value')
  } else {
    users.push([userInitals, userScore])
    localStorage.setItem('users', JSON.stringify(users))
    viewHighScore()
  }
}

function viewHighScore(){
  container.innerHTML = ''

  var title = document.createElement('h2')
  title.textContent = 'High Scores'
  container.appendChild(title)

  var table  = document.createElement("table")
  var tablerow = document.createElement('tr')
  var usertableheader = document.createElement('th')
  usertableheader.textContent = 'user'
  var scoretableheader = document.createElement('th')
  scoretableheader.textContent = 'score'

  tablerow.appendChild(usertableheader)
  tablerow.appendChild(scoretableheader)
  table.appendChild(tablerow)
  container.appendChild(table)

  users.forEach(el => {
    var user = el[0]
    var score = el[1]
    var tablerow = document.createElement('tr')
    var tabledatauser = document.createElement('td')
    var tabledatascore = document.createElement('td')

    tabledatauser.textContent = user
    tabledatascore.textContent = score
    
    tablerow.appendChild(tabledatauser)
    tablerow.appendChild(tabledatascore)
    table.appendChild(tablerow)
  })

  var buttoncontainer = document.createElement('div')
  buttoncontainer.setAttribute('class','buttoncontainer')
  var restart = document.createElement('button')
  restart.textContent = 'restart'
  restart.setAttribute('class', 'restart')
  var clear = document.createElement('button')
  clear.textContent = 'clear highscores'
  clear.setAttribute('class','highscoretitle')

  buttoncontainer.appendChild(restart)
  buttoncontainer.appendChild(clear)

  container.appendChild(buttoncontainer)

  document.querySelector('.highscoretitle').addEventListener('click',clearHighScores)
  document.querySelector('.restart').addEventListener('click',reload)
}

function clearHighScores(){
  users = []
  localStorage.clear()
  viewHighScore()
}

function reload(){
  location.reload();
}

document.querySelector('#highscores').addEventListener('click',viewHighScore)
startBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", countdown);