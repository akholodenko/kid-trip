import atob from 'atob'
import Venue from '../../models/venue'
import UserVenueFavorite from '../../models/user_venue_favorite'
import UserProfileConfig from '../../models/user_profile_config'
import Image from '../../models/image'
import { S3_URL } from '../../utils/urlUtils'
import { getUser } from './userInfo'
import { getVenues } from '../venue'

export const getUserProfile = (publicId, { fields }) => {
  const userId = atob(publicId) / 999999999

  return Promise.all([
    getUser(userId, {}),
    getUserProfileConfig(userId),
    Venue.count({ where: { user_id: userId } }),
    UserVenueFavorite.count({ where: { user_id: userId } }),
    getUserRecentFavoriteVenues(userId),
    getUserRecentAddedVenues(userId)
  ]).then(responses => {
    return {
      user: responses[0],
      config: responses[1],
      stats: {
        created: responses[2],
        favorited: responses[3]
      },
      recentFavoriteVenues: responses[4],
      recentAddedVenues: responses[5],
      modules: {
        primary: [
          {
            id: 'user_profile_public_feed',
            query: 'GET_USER_PROFILE_FEED'
          }
        ],
        secondary: [
          {
            id: 'user_profile_recent_additions',
            query: 'GET_USER_PROFILE_RECENT_ADDITIONS'
          }
        ]
      }
    }
  })
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

const getUserRecentFavoriteVenues = userId => {
  return UserVenueFavorite.findAll({
    attributes: ['venue_id'],
    where: { user_id: userId },
    order: [['createdAt', 'DESC']],
    limit: 5
  }).then(response => {
    if (response) {
      let venueIds = response
        .map(favorite => {
          return favorite.venue_id
        })
        .join(',')

      return getVenues(
        { ids: venueIds, sort: 'DESC' },
        { fields: { venueTypes: true, city: true, state: true } }
      )
    }
  })
}

const getUserRecentAddedVenues = userId => {
  return Venue.findAll({
    attributes: ['id'],
    where: { user_id: userId },
    order: [['createdAt', 'DESC']],
    limit: 5
  }).then(response => {
    if (response) {
      let venueIds = response
        .map(added => {
          return added.id
        })
        .join(',')

      return getVenues(
        { ids: venueIds, sort: 'DESC' },
        { fields: { venueTypes: true, city: true, state: true } }
      )
    }
  })
}