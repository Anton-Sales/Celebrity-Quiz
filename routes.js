const express = require('express')
const fileFun = require('./fileFun')
const router = express.Router()

let questions
let score

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/home', (req, res) => {
  resetScore()
  //make questions = questions.json
  fileFun.readJSON('./questions.json', obj => {
    questions = obj
    res.render('home')
  })
})

router.get('/quiz', (req, res) => {
  if (questions) {
  // question = next question from array
  let question = questions.pop()
  res.render('quiz', question)
  }
  else res.redirect('/home')

})

router.get('/profile', (req, res) => {
  if (score) {
  //get profiles from profiles.json
  fileFun.readJSON('./profiles.json', obj => {
    //winner = profile from the highest score
    let winner = getWinner(obj)
    res.render('profile', winner)
  })
  }
  else res.redirect('/home')
})

router.post('/home', (req, res) => {
  res.redirect('quiz')
})

router.post('/quiz', (req, res) => {
  let answer = req.body.name.toLowerCase()
  // add answer to score
  addScore(answer)
  //if all questions answered
  if (questions.length < 1){
    res.redirect('profile')
  }
  else {
    res.redirect('quiz')
  }
})

function getWinnerName() {
  score.sort((a, b) => b.score - a.score)
  return score[0].name // = highest value from score
}

function getWinner(profiles) {
  let name = getWinnerName()
  return profiles.find(obj => obj.name.toLowerCase() == name )
}

function addScore(answer) {
  let scorer = score.find(obj => obj.name == answer)
  scorer.score++
}

function resetScore() {
  score = [
    {name: "anton", score: 0},
    {name: "brad", score: 0},
    {name: "cate", score: 0},
    {name: "rebecca", score: 0},
    {name: "ross", score: 0}
  ]
}

module.exports = router
