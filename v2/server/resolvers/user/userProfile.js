import Venue from '../../models/venue'
import UserVenueFavorite from '../../models/user_venue_favorite'
import UserProfileConfig from '../../models/user_profile_config'
import Image from '../../models/image'
import { S3_URL } from '../../utils/urlUtils'
import { getUser } from './userInfo'
import { getVenues } from '../venue'
import UserFollower from '../../models/user_follower'
import { userPublicIdToDbId } from './utils'
import User from '../../models/user'

export const getUserProfile = (publicId, { fields, currentUserId }) => {
  const userId = userPublicIdToDbId(publicId)

  return Promise.all([
    getUser(userId, {}),
    getUserProfileConfig(userId),
    Venue.count({ where: { user_id: userId } }),
    UserVenueFavorite.count({ where: { user_id: userId } }),
    getUserRecentFavoriteVenues(userId),
    getUserRecentAddedVenues(userId),
    isCurrentUserFollower(userId, currentUserId),
    UserFollower.count({ where: { follower_user_id: userId } }),
    UserFollower.count({ where: { followee_user_id: userId } })
  ]).then(responses => {
    return {
      user: responses[0],
      config: responses[1],
      stats: {
        created: responses[2],
        favorited: responses[3],
        followedByCurrentUser: responses[6],
        followers: responses[8], // count of users that follow this user
        followees: responses[7] // count of users that this user follows
      },
      recentFavoriteVenues: responses[4],
      recentAddedVenues: responses[5]
    }
  })
}

export const createUserFollower = (obj, args, { user }, info) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  console.log('CREATE userId: ', user.userId, 'publicId: ', args.publicId)

  const userId = userPublicIdToDbId(args.publicId)

  return UserFollower.findOrCreate({
    where: {
      follower_user_id: user.userId,
      followee_user_id: userId
    }
  }).then(follower => {
    return getUserFollowerStats(userId, user.userId)
  })
}

export const deleteUserFollower = (obj, args, { user }, info) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  console.log('DELETE userId: ', user.userId, 'publicId: ', args.publicId)

  const userId = userPublicIdToDbId(args.publicId)

  return UserFollower.destroy({
    where: {
      follower_user_id: user.userId,
      followee_user_id: userId
    }
  }).then(() => {
    return getUserFollowerStats(userId, user.userId)
  })
}

const getUserProfileConfig = userId => {
  return UserProfileConfig.findOne({
    where: { user_id: userId },
    attributes: ['config']
  }).then(result => {
    if (result && result.config) {
      if (result.config.headerImageId) {
        return getUserProfileHeaderImageUrl(result.config.headerImageId)
      } else {
        return {
          headerImageUrl: null
        }
      }
    } else {
      return User.createProfileConfig(userId).then(newResult =>
        getUserProfileHeaderImageUrl(newResult.config.headerImageId)
      )
    }
  })
}

const getUserProfileHeaderImageUrl = imageId => {
  return Image.findByPk(imageId).then(image => {
    return {
      headerImageUrl: `${S3_URL}assets/profile-backgrounds/${image.filename}`
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

      if (venueIds) {
        return getVenues(
          { ids: venueIds, sort: 'DESC' },
          { fields: { venueTypes: true, city: true, state: true } }
        )
      } else {
        return null
      }
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

      if (venueIds) {
        return getVenues(
          { ids: venueIds, sort: 'DESC' },
          { fields: { venueTypes: true, city: true, state: true } }
        )
      } else {
        return null
      }
    }
  })
}

const isCurrentUserFollower = (userId, currentUserId) => {
  return UserFollower.findOne({
    where: { follower_user_id: currentUserId, followee_user_id: userId }
  }).then(followedByCurrentUser => {
    return !!followedByCurrentUser
  })
}

const getUserFollowerStats = (userId, currentUserId) => {
  return Promise.all([
    isCurrentUserFollower(userId, currentUserId),
    UserFollower.count({ where: { follower_user_id: userId } }),
    UserFollower.count({ where: { followee_user_id: userId } })
  ]).then(responses => {
    return {
      followedByCurrentUser: responses[0],
      followers: responses[2], // count of users that follow this user
      followees: responses[1] // count of users that this user follows
    }
  })
}
