const express = require('express')
const app = express()
const path = require('path')
const { urlencoded } = require('body-parser')
const { addRowToSheet } = require('./googleDocument')
const { sendEmail } = require('./criticalBug')

require('dotenv').config()

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(urlencoded({ extended: true }))


app.get('/', (_request, response) => {
  response.render('home')
})

app.post('/', (request, response) => {
  const rowSheet = {
    name: request.body.name,
    email: request.body.email,
    issueType: request.body.issueType,
    source: request.query.source || 'direct',
    expectedOutput: request.body.expectedOutput,
    receivedOutput: request.body.receivedOutput,
    userAgent: request.body.userAgent,
    userDate: request.body.userDate
  }

  if (request.body.issueType === 'CRITICAL') {
    sendEmail(rowSheet)
  }

  addRowToSheet(rowSheet)

  response.render('success')
})

app.listen(3000, (err) => {
  if (err) {
    console.log('Error happened', err)
  } else {
    console.log('bugtracker running http://localhost:3000')
  }
})
