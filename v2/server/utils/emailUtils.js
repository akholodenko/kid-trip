import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
const result = dotenv.config({ path: 'config.env' })

if (result.error) {
  throw result.error
}

const { SENDGRID_KEY } = result.parsed
sgMail.setApiKey(SENDGRID_KEY)

const FROM_ARTEM = { name: 'Artem K.', email: 'artem@mykidtrip.com' }
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

export const sendFollowEmail = (followerUser, followeeUser) => {
  console.log(
    `send email to ${followeeUser.firstName} ${followeeUser.lastName} about user being followed by ${followerUser.firstName} ${followerUser.lastName}`
  )
}

const sendEmail = (message, from = FROM_ARTEM) => {
  message.from = from
  sgMail.send(message)
}
