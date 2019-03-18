import jwt from 'jsonwebtoken'

export const APP_SECRET = 'KidTrip-is-aw3some'

export const getUserId = (context) => {
	const Authorization = context.request.get('Authorization')
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const { userId } = jwt.verify(token, APP_SECRET)
		return userId
	}

	throw new Error('Not authenticated')
}

export const getUserByToken = (token) => {
	if (token) {
		token = token.replace('Bearer ', '')
		return jwt.verify(token, APP_SECRET)
	}
}