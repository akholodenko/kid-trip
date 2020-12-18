'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users_followers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        follower_user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        followee_user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
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
        queryInterface.addIndex('users_followers', ['follower_user_id'], {
          indexName: 'users_profile_config_follower_index'
        })

        queryInterface.addIndex('users_followers', ['followee_user_id'], {
          indexName: 'users_profile_config_followee_index'
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_followers')
  }
}
