import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../utils'
import User from '../models/user'

async function signup(parent, args) {
	const password = await bcrypt.hash(args.password, 10)

	const user = await User.create({
		first_name: args.firstName,
		last_name: args.lastName,
		email: args.email,
		password
	}).then(newUser => {
		return {
			id: newUser.id,
			firstName: newUser.first_name,
			lastName: newUser.last_name,
			email: newUser.email,
		}
	})

	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

async function login(parent, args, context) {
	// 1
	// const user = await context.prisma.user({ email: args.email })
	const user = {}
	if (!user) {
		throw new Error('No such user found')
	}

	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error('Invalid password')
	}

	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

module.exports = {
	signup,
	login,
}