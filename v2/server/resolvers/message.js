import { Op } from 'sequelize'
import Message from '../models/message'
import User from '../models/user'
import { USER_ATTRIBUTES } from './user/userInfo'

export const getInboxMessages = (userId, fields) => {
  if (!!fields.messages) {
    let associations = []

    if (!!fields.messages.sender) {
      associations.push({
        model: User,
        as: 'MessageSender',
        attributes: USER_ATTRIBUTES
      })
    }

    return Message.findAll({
      attributes: [
        'id',
        'sender_user_id',
        'recipient_user_id',
        'message_type',
        'status',
        'body',
        'created_at'
      ],
      include: associations,
      where: {
        recipient_user_id: userId
      },
      order: [['created_at', 'DESC']]
    })
  }

  return null
}

export const getAllMessages = (userId, fields) => {
  if (!!fields.messages) {
    return Message.findAll({
      attributes: [
        'id',
        'sender_user_id',
        'recipient_user_id',
        'message_type',
        'status',
        'body',
        'created_at'
      ],
      where: {
        [Op.or]: [{ recipient_user_id: userId }, { sender_user_id: userId }]
      },
      order: [['created_at', 'DESC']]
    })
  }

  return null
}
