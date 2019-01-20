import City from '../models/city'

export const getCities = (options) => {
	return City.findAll({
		order: [['name', 'ASC']],
		limit: options.limit || null
	})
}