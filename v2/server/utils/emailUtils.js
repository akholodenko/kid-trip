import sgMail from "@sendgrid/mail"
import dotenv from 'dotenv'
const result = dotenv.config({ path: 'config.env' })

if (result.error) {
	throw result.error
}

const { SENDGRID_KEY } = result.parsed
sgMail.setApiKey(SENDGRID_KEY);

export const sendWelcomeEmail = (user) => {
	sendEmail({
		to: user.email,
		subject: 'Welcome to KidTrip!',
		text: `Hi ${user.firstName}`,
		html: `<strong>Hi ${user.firstName}!</strong><p> Welcome back to childhood.</p>`,
	})
}

const sendEmail = (message) => {
	message.from = 'no-reply@mykidtrip.com'
	sgMail.send(message);
}