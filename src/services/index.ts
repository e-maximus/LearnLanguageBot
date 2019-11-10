import bluebird from 'bluebird'
import databaseInit from './database'
import { init as currencyRateInit } from '../models/currencyRate'

const initApplication = async () => {
  console.log('initApplication: ', Date.now())
  global.Promise = bluebird
  const database = databaseInit()
  await currencyRateInit(database)
}

export default initApplication