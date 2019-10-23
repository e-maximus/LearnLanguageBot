const Telegraf = require('telegraf')
const answerNo = require('./answers/no')

const bot = new Telegraf(process.env.API_KEY)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => {
    console.log('Sticker: ', JSON.stringify(ctx.message))
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', (ctx) => {
    console.log(JSON.stringify(ctx.message), ctx.message.text.toLowerCase())
    if (ctx.message.text.toLowerCase().endsWith('нет')) {
        ctx.reply(answerNo[Math.random(0, answerNo.length - 1)])
    }
})
bot.launch()
