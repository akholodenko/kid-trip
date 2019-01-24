import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../utils'
import User from '../models/user'

export const fromDbUserTransform = (user) => {
	return {
		id: user.id,
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
	}
}

async function signup(parent, args) {
	const password = await bcrypt.hash(args.password, 10)

	const user = await User.create({
		first_name: args.firstName,
		last_name: args.lastName,
		email: args.email,
		password
	}).then(newUser => {
		return fromDbUserTransform(newUser)
	})

	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

async function login(parent, args) {
	const user = await User.find({where: {email: args.email }})

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
		user: fromDbUserTransform(user),
	}
}

module.exports = {
	signup,
	login,
}