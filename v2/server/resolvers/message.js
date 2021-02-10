import { Op } from 'sequelize'
import Message from '../models/message'
import User from '../models/user'
import { USER_ATTRIBUTES } from './user/userInfo'
import sequelize from '../config/sequelize'
import { fromDbMessageTransform } from './message/utils'

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

export const getMessages = (userId, status, fields) => {
  console.log('here', userId, status)
  let associations = []

  if (!!fields.sender) {
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
      recipient_user_id: userId,
      status: status
    },
    order: [['created_at', 'DESC']]
  }).then(messages => messages.map(message => fromDbMessageTransform(message)))

  return null
}

export const getMessageCount = userId => {
  if (userId) {
    return Message.findAll({
      attributes: ['status', [sequelize.fn('COUNT', 'id'), 'count']],
      where: {
        recipient_user_id: userId
      },
      group: ['status']
    }).then(results => {
      let response = {
        unread: 0,
        read: 0,
        archived: 0,
        deleted: 0
      }

      results.map(result => (response[result.status] = result.count))
      return response
    })
  }

  return null
}
