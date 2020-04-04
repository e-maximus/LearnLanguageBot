import Telegraf from 'telegraf'
import textHandler from './handlers/text'
import stickerHandler from './handlers/sticker'
import photoHandler from './handlers/photo'
import initApplication from './services/'
import { downloadTelegramFile } from './services/files'

import * as tfTypes from 'telegraf/typings'

const initializeBot = async () => {

    await initApplication()

    const bot = new Telegraf(process.env.BOT_KEY)
    bot.start((context: tfTypes.ContextMessageUpdate) => context.reply('Welcome! Huelcome!\nUse /help to start'))
    bot.help((context: tfTypes.ContextMessageUpdate) => context.replyWithMarkdown('List of available commands and reactions: \n\n*Reactions:* ' +
      '\n - _bitcoin|битко[ий]н_ - current bitcoin rate to USD and changes for the last 24 hours. example: _rate [hour change] [day change]_' +
      '\n - _bitcoin|битко[ий]н prediction_ - particularly well calculated prediction of bitcoin rate for 24 hours based on using Artificial Intelligence service' +
      '\n - _диаметр [y ]\* anything_ - random phrase about a diameter of "anything" ' +
      '\n - _нет$_ - random reply in rhyme' +
      '\n - _^lenta$_ - set of images of sale goods in Lenta today'))

    bot.on('text', textHandler)
    bot.on('sticker', stickerHandler)
    bot.on('photo', photoHandler)

    bot.command('settings', (context: tfTypes.ContextMessageUpdate) => {
        console.log('Settings command: ', JSON.stringify(context.message))
    })


    bot.launch()
}

initializeBot()
