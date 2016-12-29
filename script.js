function Question (prompt, answers, answerIndex) {
  this.prompt = prompt
  this.choices = answers
  this.correctChoice = answerIndex
}

var q1 = new Question('Malcolm Gladwell\'s book is titled What the _____ Saw', ['Cat', 'Dog', 'Rabbit', 'Mouse'], 1)
var q2 = new Question('New York City is in ____', ['Australia', 'USA', 'Spain', 'China'], 1)
var q3 = new Question('Tesla Motors makes electric _____', ['rockets', 'cars', 'bicycles', 'aeroplanes'], 1)
var q4 = new Question('The Greatest TV Show of All Time is ___', ['nothing', 'The West Wing', 'wrong', 'not an option'], 1)

var quiz = {
  currentQuestion: 0,
  questions: [q1, q2, q3, q4],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0,
  currentPlayer: 1
}

// THERE BE FUNCTIONS AHEAD
function numberOfQuestions () {
  return quiz.questions.length
}
function currentQuestion () {
  return quiz.currentQuestion
}
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].correctChoice
}
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].choices.length
}

function playTurn (choice) {
  if (quiz.isGameOver) {
    return false
  }
  var correct = false
  if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
    correct = true
    if (quiz.currentQuestion % 2) {
      quiz.player2Points++
    } else {
      quiz.player1Points++
    }
  }
  quiz.currentPlayer = quiz.currentPlayer === 1 ? 2 : 1
  ++quiz.currentQuestion
  var prognum = (quiz.currentQuestion + 1) * 25 + '%'
  console.log(prognum)
  $('.progress-bar').css('width', prognum)
  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true
  }
  return correct
}

function isGameOver () {
  return quiz.isGameOver
}
function whoWon () {
  if (!quiz.isGameOver) {
    return 0
  }
  if (quiz.player1Points > quiz.player2Points) {
    return 'Player 1 wins!'
  }
  if (quiz.player1Points < quiz.player2Points) {
    return 'Player 2 Wins!'
  }
  return 'It\'s a draw! Click restart to play again.'
}
function restart () {
  quiz.isGameOver = false
  quiz.currentQuestion = 0
  quiz.player1Points = 0
  quiz.player2Points = 0
  quiz.currentPlayer = 1
  $('.btn-warning').removeClass('hidden')
}

function updateDisplay () {
  if (isGameOver()) {
    $('.game-status').text('Game Over!')
    $('.well').text(whoWon())
    $('.btn-warning').addClass('hidden')
  } else {
    $('.game-status').text('It is Player ' + (quiz.currentPlayer) + '\'s turn')
    $('.well').text((quiz.currentQuestion + 1) + ') ' + quiz.questions[quiz.currentQuestion].prompt)

    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].choices[0])
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].choices[1])
    $('button').eq(2).text(quiz.questions[quiz.currentQuestion].choices[2])
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].choices[3])
  }
  $('.p1score').text(quiz.player1Points)
  $('.p2score').text(quiz.player2Points)
}

$(function () {
  $('.btn-warning').click(function () {
    if (isGameOver()) {
      restart()
    } else {
      playTurn($(this).index())
    }
    updateDisplay()
  })
  updateDisplay()
})

$('.jumbotron').on('click', function () {
  $('.jumbotron').addClass('hidden')
  $('.container').removeClass('hidden')
  $('.progress-bar').css('width', '25%')
  restart()
  updateDisplay()
})
$('.restart').on('click', function () {
  $('.jumbotron').removeClass('hidden')
  $('.container').addClass('hidden')
})
