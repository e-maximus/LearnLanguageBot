import Sequelize from 'sequelize'
import answersNo from '../answers/no'
import getDiameterAnswers from '../answers/diameter'
import { randomNumber } from '../utils'
import { CurrencyRate } from '../models/currencyRate';

import * as tfTypes from 'telegraf/typings/index'

export const noTextHandler = (context: tfTypes.ContextMessageUpdate) => {
  if (context.message.text.toLowerCase().endsWith('нет')) {
    context.reply(answersNo[Math.floor(Math.random() * Math.floor(answersNo.length))])
  }
}

export const diameterTextHandler = (context: tfTypes.ContextMessageUpdate) => {
  const matches = context.message.text.toLowerCase().match(/диаметр [у ]*([^ ?]+)/)
  if (matches) {
    const choices = getDiameterAnswers(matches[1])
    context.reply(choices[randomNumber(0, choices.length - 1)])
  }
}

export const bitcoinTextHandler = async (context: tfTypes.ContextMessageUpdate) => {
  const bitcoin = context.message.text.toLowerCase().match(/bitcoin|битко[ий]н/)
  const prediction = context.message.text.toLowerCase().match(/prediction/)
  if (bitcoin) {
    if (prediction) {
      let value = 0
      for (let i=1; i<10; i++) {
        value += Math.random()<=(10-i)/10? Math.random()>0.5?Math.random()*i:-Math.random()*i : 0
      }
      context.reply(`Bitcoin will ${value>=0?'grow':'fall'} by ${value.toFixed(2)}%`)
    } else {
      const [currentRate, hourAgoRate, dayAgoRate] = await Promise.all([
        CurrencyRate.findOne({
          order: [ [ 'created_at', 'DESC' ]]
        }),
        CurrencyRate.findOne({
          order: Sequelize.literal('abs(EXTRACT(EPOCH FROM NOW() - INTERVAL \'1 hour\') - EXTRACT(EPOCH FROM created_at))')
        }),
        CurrencyRate.findOne({
          order: Sequelize.literal('abs(EXTRACT(EPOCH FROM NOW() - INTERVAL \'1 day\') - EXTRACT(EPOCH FROM created_at))')
        }),
      ])

      const hourChange = parseFloat(((currentRate.rate - hourAgoRate.rate)/currentRate.rate*100).toFixed(2))
      const dayChange = parseFloat(((currentRate.rate - dayAgoRate.rate)/currentRate.rate*100).toFixed(2))

      context.reply(`${currentRate.rate} USD ${hourChange>=0?'+':''}${hourChange}% ${dayChange>=0?'+':''}${dayChange}%`)
    }
  }
}

const textHandlersList = [
  bitcoinTextHandler,
  diameterTextHandler,
  noTextHandler
]

const textHandler = (context: tfTypes.ContextMessageUpdate) => {
  console.log(JSON.stringify(context.message))
  for (let textHandler of textHandlersList) {
    textHandler(context)
  }
}

export default textHandler
