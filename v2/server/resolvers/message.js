import { Op } from 'sequelize'
import Message from '../models/message'
import User from '../models/user'
import { USER_ATTRIBUTES } from './user/userInfo'
import sequelize from '../config/sequelize'
import { fromDbMessageTransform } from './message/utils'

const MESSAGE_ATTRIBUTES = [
  'id',
  'sender_user_id',
  'recipient_user_id',
  'message_type',
  'status',
  'body',
  'created_at'
]

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
      attributes: MESSAGE_ATTRIBUTES,
      include: associations,
      where: {
        recipient_user_id: userId
      },
      order: [['created_at', 'DESC']]
    })
  }

  return null
}

export const getMessages = (userId, status, fields) => {
  let associations = []
  let where

  if (!!fields.sender) {
    associations.push({
      model: User,
      as: 'MessageSender',
      attributes: USER_ATTRIBUTES
    })
  }

  if (!!fields.recipient) {
    associations.push({
      model: User,
      as: 'MessageRecipient',
      attributes: USER_ATTRIBUTES
    })
  }

  if (status === 'sent') {
    where = {
      sender_user_id: userId
    }
  } else {
    where = {
      recipient_user_id: userId,
      status: status
    }
  }

  return Message.findAll({
    attributes: MESSAGE_ATTRIBUTES,
    include: associations,
    where,
    order: [['created_at', 'DESC']]
  }).then(messages => messages.map(message => fromDbMessageTransform(message)))
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
