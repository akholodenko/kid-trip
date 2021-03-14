'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('messages', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        sender_user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        recipient_user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        message_type: {
          allowNull: false,
          type: Sequelize.ENUM('auto', 'direct')
        },
        body: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        status: {
          allowNull: false,
          type: Sequelize.ENUM('unread', 'read', 'archived', 'deleted')
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        queryInterface.addIndex('messages', ['sender_user_id'], {
          indexName: 'messages_sender_user_index'
        })

        queryInterface.addIndex('messages', ['recipient_user_id'], {
          indexName: 'messages_recipient_user_index'
        })

        queryInterface.addIndex('messages', ['status'], {
          indexName: 'messages_status_index'
        })

        queryInterface.addIndex('messages', ['recipient_user_id', 'status'], {
          indexName: 'messages_recipient_user_status_index'
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages')
  }
}
