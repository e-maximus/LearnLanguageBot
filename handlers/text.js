const answersNo = require('../answers/no')
const getDiameterAnswers = require('../answers/diameter')
const { randomNumber } = require('../utils/')

const noTextHandler = (context) => {
  if (context.message.text.toLowerCase().endsWith('нет')) {
    context.reply(answersNo[Math.floor(Math.random() * Math.floor(answersNo.length))])
  }
}

const diametrTextHandler = (context) => {
  const matches = context.message.text.toLowerCase().match(/диаметр у ([^ ?]+)/)
  if (matches) {
    const choices = getDiameterAnswers(matches[1])
    context.reply(choices[randomNumber(0, choices.length - 1)])
  }
}

module.exports = [
  diametrTextHandler,
  noTextHandler
]
