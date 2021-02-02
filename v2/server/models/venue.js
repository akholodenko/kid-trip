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
    user_id: Sequelize.INTEGER,
    geom: Sequelize.GEOMETRY('POINT', 4326)
  },
  {
    tableName: 'venues',
    underscored: true
  }
)

Venue.afterCreate(venueInstance => {
  Venue.generateGeom(venueInstance.id)
})

Venue.generateGeom = venueId => {
  sequelize.query(`
      update venues
      set geom = ST_SetSRID(ST_MakePoint(zipcodes.lat, zipcodes.lng), 4326) from zipcodes
      where venues.id = ${venueId} AND zipcodes.zip = venues.zipcode;
  `)
}

UsersVenuesFavorites.hasMany(Venue, {
  foreignKey: 'id',
  sourceKey: 'venue_id'
})

export default Venue
