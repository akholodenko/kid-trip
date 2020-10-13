import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import atob from 'atob'
import { Op } from 'sequelize'
import { APP_SECRET } from '../utils'
import User from '../models/user'
import Venue from '../models/venue'
import City from '../models/city'

import { fromDbVenueTransform, VENUE_ATTRIBUTES } from './venue'
import VenueType from '../models/venue_type'

import { sendWelcomeEmail } from '../utils/emailUtils'
import UserVenueFavorite from '../models/user_venue_favorite'
import UserFeedConfig from '../models/user_feed_config'
import UserProfileConfig from '../models/user_profile_config'
import Image from '../models/image'

import { S3_URL } from '../utils/urlUtils'

const fromDbUserTransform = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    zipcode: user.zipcode,
    venues: user.venues
      ? user.venues.map(venue => fromDbVenueTransform(venue))
      : null,
    favoriteVenues: user.favoriteVenues
      ? user.favoriteVenues.map(venue => fromDbVenueTransform(venue))
      : null,
    feedConfig:
      user.userFeedConfig && user.userFeedConfig.config
        ? user.userFeedConfig.config
        : null
  }
}

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

const getUser = (userId, { fields }) => {
  let associations = []
  let order = [['id', 'ASC']]

  if (fields) {
    if (!!fields.venues) {
      let venueAssociations = []

      if (!!fields.venues.venueTypes) {
        venueAssociations.push({ model: VenueType })
      }

      if (!!fields.venues.city || !!fields.venues.state) {
        venueAssociations.push({ model: City })
      }

      associations.push({
        model: Venue,
        attributes: VENUE_ATTRIBUTES,
        include: venueAssociations
      })

      order = [Venue, 'name', 'ASC']
    }

    if (!!fields.feedConfig) {
      associations.push({
        model: UserFeedConfig,
        attributes: ['config']
      })
    }
  }

  return User.findByPk(userId, {
    attributes: ['id', 'first_name', 'last_name', 'zipcode'],
    include: associations,
    order: [order]
  }).then(user => {
    if (!!fields && !!fields.favoriteVenues) {
      return getUserFavoriteVenues(userId, fields).then(response => {
        user.favoriteVenues = response
        return fromDbUserTransform(user)
      })
    } else {
      return fromDbUserTransform(user)
    }
  })
}

const getUserFavoriteVenues = (userId, fields) => {
  let associations = []

  if (!!fields.favoriteVenues.venueTypes) {
    associations.push({ model: VenueType })
  }

  if (!!fields.favoriteVenues.city || !!fields.favoriteVenues.state) {
    associations.push({ model: City })
  }

  associations.push({
    model: UserVenueFavorite,
    where: {
      user_id: userId
    }
  })

  return Venue.findAll({
    attributes: VENUE_ATTRIBUTES,
    include: associations,
    order: [['name', 'ASC']]
  })
}

const getUserFeedConfig = userId => {
  return UserFeedConfig.findOne({
    where: { user_id: userId },
    attributes: ['config']
  })
    .then(result =>
      result && result.config
        ? result.config
        : {
            cityIds: null,
            venueTypeIds: null
          }
    )
    .then(config => {
      if (config && config.cityIds) {
        return City.findAll({
          attributes: ['id', 'name', 'state'],
          where: {
            id: { [Op.in]: config.cityIds.split(',') }
          }
        }).then(cityDetails => {
          return { ...config, cityDetails }
        })
      } else {
        return config
      }
    })
}

const getUserProfile = (publicId, { fields }) => {
  const userId = atob(publicId) / 999999999

  return Promise.all([getUser(userId, {}), getUserProfileConfig(userId)]).then(
    responses => {
      return { user: responses[0], config: responses[1] }
    }
  )
}

const getUserProfileConfig = userId => {
  return UserProfileConfig.findOne({
    where: { user_id: userId },
    attributes: ['config']
  }).then(result => {
    if (result && result.config) {
      if (result.config.headerImageId) {
        return Image.findByPk(result.config.headerImageId).then(image => {
          return {
            headerImageUrl: `${S3_URL}assets/profile-backgrounds/${image.filename}`
          }
        })
      } else {
        return {
          headerImageUrl: null
        }
      }
    } else {
      return {
        headerImageUrl: null
      }
    }
  })
}

const updateUserFeedConfig = (obj, args, { user }, info) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  return UserFeedConfig.findOrCreate({
    where: { user_id: user.userId }
  }).then(result => {
    if (!result) {
      throw new Error('No config found')
    }

    const config = { cityIds: args.cityIds, venueTypeIds: args.venueTypeIds }
    return result[0]
      .update({ config })
      .then(updatedResult => updatedResult.config)
  })
}

module.exports = {
  signup,
  login,
  getUser,
  getUserFeedConfig,
  getUserProfile,
  updateUserFeedConfig,
  fromDbUserTransform
}
