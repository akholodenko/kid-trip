import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const Message = sequelize.define(
  'messages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sender_user_id: Sequelize.INTEGER,
    recipient_user_id: Sequelize.INTEGER,
    message_type: Sequelize.ENUM('auto', 'direct'),
    body: Sequelize.TEXT,
    status: Sequelize.ENUM('unread', 'read', 'archived', 'deleted'),
    count: Sequelize.INTEGER
  },
  {
    tableName: 'messages',
    underscored: true
  }
)

export default Message
