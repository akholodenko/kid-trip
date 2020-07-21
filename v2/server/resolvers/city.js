import { Op } from 'sequelize'
import City from '../models/city'

export const getCities = options => {
  let details = {
    order: [['name', 'ASC']],
    limit: options.limit || null
  }

  if (options.query && options.query.length) {
    const queryDetails = options.query.split(',').map(item => item.trim())

    details.where = {
      name: {
        [Op.iLike]: `${queryDetails[0]}%`
      }
    }

    if (queryDetails.length >= 2) {
      details.where.state = {
        [Op.iLike]: `${queryDetails[1]}%`
      }
    }
  }

  return City.findAll(details)
}
