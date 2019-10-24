const Telegraf = require('telegraf')

const { textHandlers } = require('./handlers/')

const bot = new Telegraf(process.env.BOT_KEY)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('There is no help there! Go away.'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', (ctx) => {
    console.log(JSON.stringify(ctx.message), ctx.message.text.toLowerCase())
    for (let textHandler of textHandlers) {
        textHandler(ctx)
    }
})
bot.launch()
