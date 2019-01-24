import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const Venue = sequelize.define('venues', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  street_address: Sequelize.STRING,
  lat: Sequelize.DECIMAL,
  lng: Sequelize.DECIMAL
}, {});

export default Venue