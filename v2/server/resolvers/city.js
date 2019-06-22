import { Op } from 'sequelize'
import City from '../models/city'

export const getCities = (options) => {
	let details = {
		order: [['name', 'ASC']],
		limit: options.limit || null
	}

	if (options.query && options.query.length) {
		details.where = {
			name: {
				[Op.like]: `${options.query}%`
			}
		}
	}

	return City.findAll(details)
}