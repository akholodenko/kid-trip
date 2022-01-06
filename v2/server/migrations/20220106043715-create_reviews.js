'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('reviews', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        venue_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        rating: {
          allowNull: true,
          type: Sequelize.FLOAT
        },
        description: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        queryInterface.addIndex('reviews', ['venue_id'], {
          indexName: 'reviews_venue_index'
        })

        queryInterface.addIndex('reviews', ['user_id'], {
          indexName: 'reviews_user_index'
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reviews')
  }
}
