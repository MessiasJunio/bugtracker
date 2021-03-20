const { GoogleSpreadsheet } = require('google-spreadsheet')
const credentials = require('../credentials.json')

const getGoogleDocument = async () => {
  const document = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)

  await document.useServiceAccountAuth(credentials)

  await document.loadInfo()

  return document
}

const addRowToSheet = async ({ ...data }) => {
  getGoogleDocument().then(doc => {
    const sheet = doc.sheetsByIndex[0];
    sheet.addRow(data).then(() => {
      console.log('Bug reported sucess!')
    })
  });
}

module.exports = { addRowToSheet }
