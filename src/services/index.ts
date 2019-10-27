import database from './database'
import bluebird from 'bluebird'

const initApplication = async () => {
  global.Promise = bluebird
  await database.authenticate()
}

export default initApplication