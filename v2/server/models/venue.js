import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import UsersVenuesFavorites from './user_venue_favorite'
import City from './city'
import VenueType from './venue_type'
import VenueClassification from './venue_classification'
import User from './user'
import UsersVenues from './user_venue'
import Review from './review'

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

Venue.belongsTo(City, {
  foreignKey: 'city_id'
})

Venue.hasMany(VenueClassification, {
  foreignKey: 'venue_id'
})

Venue.hasMany(UsersVenuesFavorites, {
  foreignKey: 'venue_id'
})

Venue.belongsToMany(User, {
  through: UsersVenues,
  foreignKey: 'venue_id',
  otherKey: 'user_id'
})

Venue.belongsTo(User, {
  as: 'creator',
  foreignKey: 'user_id'
})

User.belongsToMany(Venue, {
  through: UsersVenues,
  foreignKey: 'user_id',
  otherKey: 'venue_id'
})

Venue.belongsToMany(VenueType, {
  through: VenueClassification,
  foreignKey: 'venue_id',
  otherKey: 'venue_type_id'
})

VenueType.belongsToMany(Venue, {
  through: VenueClassification,
  foreignKey: 'venue_type_id',
  otherKey: 'venue_id'
})

Venue.hasMany(Review, {
  foreignKey: 'venue_id'
})

Review.belongsTo(Venue, {
  foreignKey: 'venue_id'
})

export default Venue
