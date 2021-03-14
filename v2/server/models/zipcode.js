import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import Venue from './venue'
import City from './city'
import CityZipcode from './city_zipcode'

const Zipcode = sequelize.define(
  'Zipcode',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    zip: Sequelize.INTEGER,
    lat: Sequelize.DECIMAL,
    lng: Sequelize.DECIMAL,
    geom: Sequelize.GEOMETRY('POINT', 4326)
  },
  {
    tableName: 'zipcodes',
    timestamps: false
  }
)

Zipcode.hasMany(Venue, {
  foreignKey: 'zipcode',
  sourceKey: 'zip'
})

Zipcode.belongsToMany(City, {
  through: CityZipcode,
  foreignKey: 'zipcode',
  otherKey: 'city_id',
  sourceKey: 'zip'
})

City.belongsToMany(Zipcode, {
  through: CityZipcode,
  foreignKey: 'city_id',
  otherKey: 'zipcode',
  targetKey: 'zip'
})

Venue.belongsTo(Zipcode, {
  foreignKey: 'zipcode',
  targetKey: 'zip'
})

export default Zipcode
