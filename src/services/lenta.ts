const puppeteer = require('puppeteer');
import fs from 'fs'

const FILES_FOLDER = 'files'

const readFiles = (folder: string) => {
  const list: any = []
  fs.readdirSync(folder).forEach((file) => {
    list.push({
      media: { source: `${folder}/${file}` },
      caption: file,
      type: 'photo'
    },)
  });

  return list
}

const lenta = async () => {

  var date = new Date();
  const ymd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  const localFilePath = `${FILES_FOLDER}/lenta/${ymd}`
  console.log('localFilePath: ', localFilePath)
  if (fs.existsSync(localFilePath)) {
    return readFiles(localFilePath)
  }

  console.log('Not exists ', __dirname)
  fs.mkdirSync(localFilePath, { recursive: true })

  const browser = await puppeteer.launch({
    defaultViewport: null,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  var cookie = [
    {
      'domain': 'lenta.com',
      'expirationDate': 1797288045,
      'name': 'CityCookie',
      'path': '/',
      'sameSite': 'no_restriction',
      'value': 'nnvgrd'
    },
    {
      'domain': 'lenta.com',
      'expirationDate': 1797288045,
      'name': 'UseCookieNotification',
      'path': '/',
      'sameSite': 'no_restriction',
      'value': 'true'
    }
  ];
  await page.setCookie(...cookie);

  await page.goto('https://lenta.com/goods-actions/weekly-products/', {waitUntil: 'networkidle2', timeout: 60000});

  // await page.evaluate(async () => {
  await page.screenshot({path: `${localFilePath}/lenta.png`, fullPage: true});
  const elements = await page.$$('.mass-promo-search__item');

  for (let i = 0; i < elements.length; i++) {
    try {
      // get screenshot of a particular element
      console.log('Create file: ', `${localFilePath}/${i}.png`)
      await elements[i].screenshot({path: `${localFilePath}/${i}.png`});
    } catch (e) {
      // if element is 'not visible', spit out error and continue
      console.log(`couldnt take screenshot of element with index: ${i}. cause: `, e)
    }
  }
  // });

  await browser.close();

  return readFiles(localFilePath)
};

export default lenta
