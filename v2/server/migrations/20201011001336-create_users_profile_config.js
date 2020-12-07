'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users_profile_config', {
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
        queryInterface.addIndex('users_profile_config', ['user_id'], {
          indexName: 'users_profile_config_user_index'
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_profile_config')
  }
}
