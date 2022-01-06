import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
const result = dotenv.config({ path: 'config.env' })

if (result.error) {
  throw result.error
}

const { SENDGRID_KEY } = result.parsed
sgMail.setApiKey(SENDGRID_KEY)

const WELCOME_EMAIL_TEMPLATE_ID = 'd-2d4384187beb44778042eab3b873657b'

export const sendWelcomeEmail = user => {
  sendEmail({
    template_id: WELCOME_EMAIL_TEMPLATE_ID,
    personalizations: [
      {
        to: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email
        },
        dynamic_template_data: {
          subject: `Welcome to KidTrip, ${user.firstName}!`,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }
    ]
  })
}

const sendEmail = message => {
  message.from = { name: 'Artem K.', email: 'artem@mykidtrip.com' }
  sgMail.send(message)
}
