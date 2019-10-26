import answersNo from '../answers/no'
import getDiameterAnswers from '../answers/diameter'
import { randomNumber } from '../utils'
import CurrencyRate from "../models/currencyRate";

import * as tfTypes from 'telegraf/typings/index'

const noTextHandler = (context: tfTypes.ContextMessageUpdate) => {
  if (context.message.text.toLowerCase().endsWith('нет')) {
    context.reply(answersNo[Math.floor(Math.random() * Math.floor(answersNo.length))])
  }
}

const diameterTextHandler = (context: tfTypes.ContextMessageUpdate) => {
  const matches = context.message.text.toLowerCase().match(/диаметр у ([^ ?]+)/)
  if (matches) {
    const choices = getDiameterAnswers(matches[1])
    context.reply(choices[randomNumber(0, choices.length - 1)])
  }
}

const bitcoinTextHandler = async (context: tfTypes.ContextMessageUpdate) => {
  const matches = context.message.text.toLowerCase().match(/bitcoin|битко[ий]н/)
  if (matches) {
    const latestRate = await CurrencyRate.findOne({
      order: [ [ 'created_at', 'DESC' ]]
    })
    context.reply(`Bitcoin: ${latestRate.rate} USD`)
  }
}

export default [
  bitcoinTextHandler,
  diameterTextHandler,
  noTextHandler
]
