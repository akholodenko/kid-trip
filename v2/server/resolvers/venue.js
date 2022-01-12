import sequelize from '../config/sequelize'
import { Op } from 'sequelize'

import Venue from '../models/venue'
import VenueType from '../models/venue_type'
import VenueClassification from '../models/venue_classification'
import User from '../models/user'
import UserVenue from '../models/user_venue'
import UserVenueFavorite from '../models/user_venue_favorite'
import City from '../models/city'

import { getReviewsByVenueId } from './review'

import { slug, uniqueSlug } from '../utils/stringUtils'

import { fromDbVenueTransform } from './venue/utils'

export const VENUE_ATTRIBUTES = [
  'id',
  'name',
  'slug',
  'description',
  'street_address',
  'city_id',
  'zipcode',
  'lat',
  'lng'
]

export const getVenue = (venueId, userId, { fields }) => {
  let associations = []

  if (!!fields.venueTypes) {
    associations.push({ model: VenueType })
  }

  if (!!fields.users) {
    associations.push({ model: User })
  }

  if (!!fields.city || !!fields.state) {
    associations.push({
      model: City,
      attributes: ['id', 'name', 'state']
    })
  }

  return Venue.findByPk(venueId, {
    attributes: VENUE_ATTRIBUTES,
    include: associations
  }).then(venue => {
    if (!!fields.venueStats) {
      return getVenueStats(venue.id, userId).then(venueStats => {
        venue.venueStats = venueStats
        return fromDbVenueTransform(venue)
      })
    } else {
      return fromDbVenueTransform(venue)
    }
  })
}

export const getVenueBySlug = (venueSlug, userId, { fields }) => {
  let associations = []

  if (!!fields.venueTypes) {
    associations.push({ model: VenueType })
  }

  if (!!fields.users) {
    associations.push({ model: User })
  }

  if (!!fields.city || !!fields.state) {
    associations.push({
      model: City,
      attributes: ['id', 'name', 'state']
    })
  }

  return Venue.findOne({
    where: { slug: venueSlug },
    attributes: VENUE_ATTRIBUTES,
    include: associations
  }).then(venue => {
    let promiseCalls = []
    let promiseLookupIndex = {
      reviews: null,
      venueStats: null
    }

    if (!!fields.reviews) {
      promiseLookupIndex.reviews = 0
      promiseCalls.push(
        getReviewsByVenueId(venue.id, 100, { fields: { reviewer: true } })
      )
    }

    if (!!fields.venueStats) {
      promiseLookupIndex.venueStats = !!fields.reviews ? 1 : 0
      promiseCalls.push(getVenueStats(venue.id, userId))
    }

    return Promise.all(promiseCalls).then(responses => {
      venue.reviews =
        promiseLookupIndex.reviews !== null
          ? responses[promiseLookupIndex.reviews]
          : null
      venue.venueStats =
        promiseLookupIndex.venueStats !== null
          ? responses[promiseLookupIndex.venueStats]
          : null

      return fromDbVenueTransform(venue)
    })
  })
}

export const getVenues = (
  { ids, cityIds, venueTypeIds, sort = 'desc', first = 10 },
  { fields }
) => {
  let associations = []
  if (!!fields.venueTypes) {
    let venueTypeAssociation = { model: VenueType }
    if (!!venueTypeIds) {
      venueTypeAssociation.where = {
        id: {
          [Op.in]: venueTypeIds.split(',').map(item => parseInt(item))
        }
      }
    }

    associations.push(venueTypeAssociation)
  }

  if (!!fields.users) {
    associations.push({ model: User })
  }

  if (!!fields.creator) {
    associations.push({ model: User, as: 'creator' })
  }

  if (!!fields.city || !!fields.state) {
    let cityAssociation = {
      model: City,
      attributes: ['id', 'name', 'state']
    }

    if (!!cityIds) {
      cityAssociation.where = {
        id: {
          [Op.in]: cityIds.split(',').map(item => parseInt(item))
        }
      }
    }

    associations.push(cityAssociation)
  }

  const queryConfig = {
    attributes: VENUE_ATTRIBUTES.concat(['created_at', 'user_id']),
    include: associations,
    order: [['created_at', sort]],
    limit: first
  }

  if (!!ids) {
    queryConfig.where = {
      id: {
        [Op.in]: ids.split(',').map(item => parseInt(item))
      }
    }
  }

  return Venue.findAll(queryConfig).then(response =>
    response.map(venue => fromDbVenueTransform(venue))
  )
}

export const createVenue = (obj, args, { user }, info) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  let venueSlug = slug(args.name)

  return getSimilarVenueSlugs(slug(venueSlug)).then(venues => {
    const existingSlugs = venues.map(u => u.get('slug'))
    venueSlug = uniqueSlug(venueSlug, existingSlugs, args.zipcode)

    return Venue.create({
      name: args.name,
      slug: venueSlug,
      street_address: args.streetAddress,
      zipcode: args.zipcode,
      lat: args.lat,
      lng: args.lng,
      city_id: args.city.id,
      user_id: user.userId
    }).then(newVenue => {
      VenueClassification.create({
        venue_id: newVenue.id,
        venue_type_id: args.venueType.id
      })

      UserVenue.create({
        venue_id: newVenue.id,
        user_id: user.userId
      })

      return fromDbVenueTransform(newVenue)
    })
  })
}

export const createUserVenueFavorite = (obj, args, { user }, info) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  return UserVenueFavorite.findOrCreate({
    where: {
      venue_id: args.venueId,
      user_id: user.userId
    }
  }).then(favorite => {
    return getVenueStats(args.venueId, user.userId)
  })
}

export const deleteUserVenueFavorite = (obj, args, { user }, info) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  return UserVenueFavorite.destroy({
    where: {
      venue_id: args.venueId,
      user_id: user.userId
    }
  }).then(() => {
    return getVenueStats(args.venueId, user.userId)
  })
}

const getSimilarVenueSlugs = slug => {
  return Venue.findAll({
    attributes: ['slug'],
    where: {
      slug: { [Op.iLike]: `${slug}%` }
    }
  })
}

const getVenueStats = (venueId, userId = null) => {
  return UserVenueFavorite.findAll({
    attributes: [
      'venue_id',
      [sequelize.fn('count', sequelize.col('id')), 'count']
    ],
    where: { venue_id: venueId },
    group: ['venue_id']
  })
    .then(results => results.map(el => el.get({ plain: true })))
    .then(totalData => {
      return UserVenueFavorite.findOne({
        where: { venue_id: venueId, user_id: userId }
      }).then(favoriteByCurrentUser => {
        return {
          favorites: totalData[0] ? totalData[0].count : 0,
          favoriteByCurrentUser: !!favoriteByCurrentUser
        }
      })
    })
}
