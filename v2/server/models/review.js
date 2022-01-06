import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const Review = sequelize.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  venue_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  rating: Sequelize.FLOAT,
  description: Sequelize.TEXT
})

export default Review
