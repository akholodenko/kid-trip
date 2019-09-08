import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const Venue = sequelize.define('venue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  slug: Sequelize.STRING,
  street_address: Sequelize.STRING,
  zipcode: Sequelize.INTEGER,
  lat: Sequelize.DECIMAL,
  lng: Sequelize.DECIMAL,
  city_id: Sequelize.INTEGER
}, {
  tableName: 'venues',
  underscored: true,
});

export default Venue