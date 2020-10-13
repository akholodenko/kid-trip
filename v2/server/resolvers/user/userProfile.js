import atob from 'atob'
import Venue from '../../models/venue'
import UserVenueFavorite from '../../models/user_venue_favorite'
import UserProfileConfig from '../../models/user_profile_config'
import Image from '../../models/image'
import { S3_URL } from '../../utils/urlUtils'
import { getUser } from './userInfo'

export const getUserProfile = (publicId, { fields }) => {
  const userId = atob(publicId) / 999999999

  return Promise.all([
    getUser(userId, {}),
    getUserProfileConfig(userId),
    Venue.count({ where: { user_id: userId } }),
    UserVenueFavorite.count({ where: { user_id: userId } })
  ]).then(responses => {
    return {
      user: responses[0],
      config: responses[1],
      stats: {
        created: responses[2],
        favorited: responses[3]
      },
      modules: {
        primary: [
          {
            name: '',
            query: ''
          }
        ],
        secondary: [
          {
            name: '',
            query: ''
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
