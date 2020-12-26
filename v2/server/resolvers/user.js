import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../utils'
import User from '../models/user'

import { sendWelcomeEmail } from '../utils/emailUtils'
import { fromDbUserTransform } from './user/utils'
import { getUser } from './user/userInfo'
import {
  getUserProfile,
  createUserFollower,
  deleteUserFollower
} from './user/userProfile'
import { getUserFeedConfig, updateUserFeedConfig } from './user/useFeedConfig'

async function signup(parent, args) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await User.create({
    first_name: args.firstName,
    last_name: args.lastName,
    email: args.email,
    password,
    zipcode: args.zode || null
  }).then(newUser => {
    return fromDbUserTransform(newUser)
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  sendWelcomeEmail(user)

  return {
    token,
    user
  }
}

async function login(parent, args) {
  const user = await User.findOne({ where: { email: args.email } })

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
    user: fromDbUserTransform(user)
  }
}

module.exports = {
  signup,
  login,
  getUser,
  getUserFeedConfig,
  getUserProfile,
  updateUserFeedConfig,
  createUserFollower,
  deleteUserFollower,
  fromDbUserTransform
}
