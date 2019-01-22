import Sequelize from "sequelize";
import sequelize from '../config/sequelize'
import VenueType from './venue_type'
import VenueClassification from './venue_classification'

const Venue = sequelize.define('venues', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  street_address: Sequelize.STRING,
  lat: Sequelize.DECIMAL,
  lng: Sequelize.DECIMAL
}, {});

Venue.belongsToMany(VenueType, {
  through: VenueClassification,
  foreignKey: 'venue_id',
  otherKey: 'venue_type_id'
});

export default Venue