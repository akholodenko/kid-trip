import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const City = sequelize.define(
  'city',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    state: Sequelize.STRING,
    lat: Sequelize.DECIMAL,
    lng: Sequelize.DECIMAL,
    timezone: Sequelize.STRING
  },
  {
    tableName: 'cities',
    timestamps: false
  }
)

export default City
