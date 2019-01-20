'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    street_address: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
  };
  return Venue;
};