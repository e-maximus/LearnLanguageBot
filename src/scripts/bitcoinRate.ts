import axios from 'axios'
import initApplication from '../services/'
import CurrencyRate from "../models/currencyRate";

const run = async () => {
  try {
    await initApplication()

    const rateClient = axios.create({
      baseURL: 'https://min-api.cryptocompare.com',
      responseType: 'json',
      timeout: 10000,
    })
    const result = await rateClient.get('/data/price?fsym=BTC&tsyms=USD')

    await CurrencyRate.create({rate: result.data['USD']})
    console.log('Rate added: ', new Date(), result.data['USD'])
  } catch (error) {
    console.error('Rate error: ', error)
  }
}

run()
