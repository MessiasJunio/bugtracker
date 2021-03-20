
const sgMail = require('@sendgrid/mail')

async function sendEmail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: 'test@exemple.com', // Change to your recipient
    from: 'test@exemple.com', // Change to your verified sender
    subject: 'Critical Error Reported',
    text: `
      The user ${data.name} reported a problem.
    `,
    html: `The user ${data.name} reported a problem.'`
  }

  try {
    await sgMail.send(msg)

  } catch(err) {
    console.log(err)
  }
}

module.exports = { sendEmail }
