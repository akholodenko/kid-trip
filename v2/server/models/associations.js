import Venue from './venue'
import VenueType from './venue_type'
import VenueClassification from './venue_classification'

import User from './user'
import UsersVenues from './user_venue'
import UsersVenuesFavorites from './user_venue_favorite'

import City from './city'
import Zipcode from './zipcode'

export const initModelAssociations = () => {
  Venue.belongsToMany(VenueType, {
    through: VenueClassification,
    foreignKey: 'venue_id',
    otherKey: 'venue_type_id'
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

  Venue.belongsTo(Zipcode, {
    foreignKey: 'zipcode',
    targetKey: 'zip'
  })

  Venue.belongsTo(City, {
    foreignKey: 'city_id'
  })

  VenueType.belongsToMany(Venue, {
    through: VenueClassification,
    foreignKey: 'venue_type_id',
    otherKey: 'venue_id'
  })

  User.belongsToMany(Venue, {
    through: UsersVenues,
    foreignKey: 'user_id',
    otherKey: 'venue_id'
  })
}
