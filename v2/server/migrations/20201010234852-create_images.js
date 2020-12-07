'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('images', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING
        },
        filename: {
          allowNull: false,
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
        queryInterface.addIndex('images', ['type'], {
          indexName: 'images_type_index'
        })
      })
      .then(() => {
        queryInterface.bulkInsert('images', [
          {
            type: 'user-profile-header',
            filename: 'desert.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            type: 'user-profile-header',
            filename: 'jungle.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            type: 'user-profile-header',
            filename: 'winter-town.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            type: 'user-profile-header',
            filename: 'beach-surf.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ])
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('images')
  }
}
