import Telegraf from 'telegraf'
import textHandler from './handlers/text'
import initApplication from './services/'

import * as tfTypes from 'telegraf/typings'

const initializeBot = async () => {

    await initApplication()

    const bot = new Telegraf(process.env.BOT_KEY)
    bot.start((context: tfTypes.ContextMessageUpdate) => context.reply('Welcome! Huelcome!\nUse /help to start'))
    bot.help((context: tfTypes.ContextMessageUpdate) => context.replyWithMarkdown('List of available commands and reactions: \n\n*Reactions:* ' +
      '\n - _bitcoin|битко[ий]н_ - current bitcoin rate to USD and changes for the next 24 hours' +
      '\n - _bitcoin|битко[ий]н prediction_ - particularly well calculated prediction of bitcoin rate for 24 hours based on using Artificial Intelligence service' +
      '\n - _диаметр [y ]\* anything_ - random phrase about a diameter of "anything"' +
      '\n - _нет$_ - random reply in rhyme'))

    bot.on('text', textHandler)

    bot.launch()
}

initializeBot()
