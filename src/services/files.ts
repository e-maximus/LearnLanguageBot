const axios = require('axios')
const fs = require('fs')
const path = require('path')

const FILES_FOLDER = 'files'

export const downloadTelegramFile = async (fileId: string, userId: string) => {
  const fileInfo = await axios.get(`https://api.telegram.org/bot${process.env.BOT_KEY}/getFile?file_id=${fileId}`)
  if (!fileInfo.data.ok) {
    throw new Error('Error downloading file ' + fileId + ': ' + JSON.stringify(fileInfo.data))
  }

  console.log('fileData: ', JSON.stringify(fileInfo.data))

  const { file_path: filePath } = fileInfo.data.result
  const localFilePath = `${FILES_FOLDER}/${userId}/${filePath}`
  if (fs.existsSync(localFilePath)) {
    fs.unlinkSync(localFilePath)
    // throw new Error('File already exists')
  }

  const fileData = await axios({
    method: 'get',
    url: `https://api.telegram.org/file/bot${process.env.BOT_KEY}/${filePath}`,
    responseType: 'stream'
  })

  if (!fs.existsSync(localFilePath)) {
    fs.mkdirSync(path.dirname(localFilePath), { recursive: true })
  }

  return fileData.data.pipe(fs.createWriteStream(localFilePath))
}

