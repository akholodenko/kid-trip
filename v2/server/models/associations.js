import Venue from './venue'
import VenueType from './venue_type'
import VenueClassification from './venue_classification'

import User from './user'
import UsersVenues from './user_venue'
import UsersVenuesFavorites from './user_venue_favorite'
import UsersFeedConfig from './user_feed_config'

import City from './city'
import CityZipcode from './city_zipcode'
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

  User.hasMany(UsersVenuesFavorites, {
    foreignKey: 'user_id'
  })

  User.hasOne(UsersFeedConfig, {
    foreignKey: 'user_id'
  })

  UsersVenuesFavorites.hasMany(Venue, {
    foreignKey: 'id',
    sourceKey: 'venue_id'
  })

  UsersVenuesFavorites.hasMany(User, {
    foreignKey: 'id',
    sourceKey: 'user_id'
  })

  UsersFeedConfig.belongsTo(User, {
    foreignKey: 'user_id'
  })

  City.belongsToMany(Zipcode, {
    through: CityZipcode,
    foreignKey: 'city_id',
    otherKey: 'zipcode',
    targetKey: 'zip'
  })

  Zipcode.belongsToMany(City, {
    through: CityZipcode,
    foreignKey: 'zipcode',
    otherKey: 'city_id',
    sourceKey: 'zip'
  })

  Zipcode.hasMany(Venue, {
    foreignKey: 'zipcode',
    sourceKey: 'zip'
  })
}
