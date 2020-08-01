'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users_feed_config', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        config: {
          allowNull: true,
          type: Sequelize.JSONB
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
        queryInterface.addIndex('users_feed_config', ['user_id'], {
          indexName: 'users_feed_config_user_index'
        })
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_feed_config')
  }
}
