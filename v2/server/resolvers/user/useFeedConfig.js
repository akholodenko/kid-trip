import UserFeedConfig from '../../models/user_feed_config'
import City from '../../models/city'
import { Op } from 'sequelize'

export const getUserFeedConfig = userId => {
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

export const updateUserFeedConfig = (obj, args, { user }, info) => {
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
