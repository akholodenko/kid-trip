import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import UsersVenuesFavorites from './user_venue_favorite'

const Venue = sequelize.define(
  'venue',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    street_address: Sequelize.STRING,
    zipcode: Sequelize.INTEGER,
    lat: Sequelize.DECIMAL,
    lng: Sequelize.DECIMAL,
    city_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
  },
  {
    tableName: 'venues',
    underscored: true
  }
)

UsersVenuesFavorites.hasMany(Venue, {
  foreignKey: 'id',
  sourceKey: 'venue_id'
})

export default Venue
