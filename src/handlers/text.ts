import answersNo from '../answers/no'
import getDiameterAnswers from '../answers/diameter'
import { randomNumber } from '../utils'

import * as tfTypes from 'telegraf/typings/index'

const noTextHandler = (context: tfTypes.ContextMessageUpdate) => {
  if (context.message.text.toLowerCase().endsWith('нет')) {
    context.reply(answersNo[Math.floor(Math.random() * Math.floor(answersNo.length))])
  }
}

const diametrTextHandler = (context: tfTypes.ContextMessageUpdate) => {
  const matches = context.message.text.toLowerCase().match(/диаметр у ([^ ?]+)/)
  if (matches) {
    const choices = getDiameterAnswers(matches[1])
    context.reply(choices[randomNumber(0, choices.length - 1)])
  }
}

export default [
  diametrTextHandler,
  noTextHandler
]
