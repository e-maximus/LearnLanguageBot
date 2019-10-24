import Telegraf from 'telegraf'
import textHandlers from './handlers/text'

import * as tfTypes from 'telegraf/typings'

const bot = new Telegraf(process.env.BOT_KEY)
bot.start((context: tfTypes.ContextMessageUpdate) => context.reply('Welcome'))
bot.help((context: tfTypes.ContextMessageUpdate) => context.reply('There is no help there! Go away.'))

bot.hears('hi', (context: tfTypes.ContextMessageUpdate) => context.reply('Hey there'))
bot.on('text', (context: tfTypes.ContextMessageUpdate) => {
    console.log(JSON.stringify(context.message), context.message.text.toLowerCase())
    for (let textHandler of textHandlers) {
        textHandler(context)
    }
})
bot.launch()