import * as tfTypes from 'telegraf/typings/index'
import { downloadTelegramFile } from '../services/files'

const photoSimpleHandler = async (context: tfTypes.ContextMessageUpdate) => {
  console.log(JSON.stringify(context.message))
  const resultFile = await downloadTelegramFile('AgADAgAD1KsxG6Rs2EmSVmcTXiQd53_Gtw8ABAEAAwIAA20AA18sBgABFgQ', 'adsdass')
  console.log(JSON.stringify(resultFile))
}

const photoHandlersList = [
  photoSimpleHandler
]

const photoHandler = (context: tfTypes.ContextMessageUpdate) => {
  console.log(JSON.stringify(context.message))
  for (let photoHandler of photoHandlersList) {
    photoHandler(context)
  }
}

export default photoHandler
