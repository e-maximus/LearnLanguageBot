import * as tfTypes from 'telegraf/typings/index'

const stickerSimpleHandler = (context: tfTypes.ContextMessageUpdate) => {
  console.log(JSON.stringify(context.message))
}

const stickerHandlersList = [
  stickerSimpleHandler
]

const stickerHandler = (context: tfTypes.ContextMessageUpdate) => {
  console.log(JSON.stringify(context.message))
  for (let stickerHandler of stickerHandlersList) {
    stickerHandler(context)
  }
}

export default stickerHandler
