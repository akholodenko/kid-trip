import { Op } from 'sequelize'

import Message from '../models/message'
import User from '../models/user'
import { USER_ATTRIBUTES } from './user/userInfo'
import sequelize from '../config/sequelize'
import { fromDbMessageTransform } from './message/utils'
import { userDbIdToPublicId } from './user/utils'

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

export const getConversation = (userId, conversationalistUserId, fields) => {
  let associations = []

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

  return Message.findAll({
    attributes: MESSAGE_ATTRIBUTES,
    include: associations,
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { recipient_user_id: userId },
            { sender_user_id: conversationalistUserId }
          ]
        },
        {
          [Op.and]: [
            { recipient_user_id: conversationalistUserId },
            { sender_user_id: userId }
          ]
        }
      ]
    },
    order: [['created_at', 'ASC']]
  }).then(messages => {
    return messages.map(message => fromDbMessageTransform(message))
  })
}

export const getConversationalists = userId => {
  return sequelize
    .query(
      `
			select
       sorted_corresponders.created_at,
       users.id, users.first_name, users.last_name
        from (select DISTINCT ON (corresponders.user_id) corresponders.user_id,
                                                         corresponders.created_at
              from (select case
                               when messages.sender_user_id = ${userId} THEN messages.recipient_user_id
                               when messages.recipient_user_id = ${userId} THEN messages.sender_user_id
                               end as "user_id",
                           messages.created_at
                    from messages
                    where messages.sender_user_id = ${userId}
                       or messages.recipient_user_id = ${userId}
                    order by messages.created_at desc
                   ) as corresponders) as sorted_corresponders
                 join users on users.id = sorted_corresponders.user_id
        order by sorted_corresponders.created_at desc;`
    )
    .then(conversationalists =>
      conversationalists[0].map(conversationalist => {
        return {
          id: conversationalist.id,
          publicId: userDbIdToPublicId(conversationalist.id),
          firstName: conversationalist.first_name,
          lastName: conversationalist.last_name,
          createdAt: conversationalist.created_at.toString()
        }
      })
    )
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
    return sequelize
      .query(
        `SELECT status, count(id) as count
			FROM messages
			WHERE recipient_user_id = ${userId}
			GROUP BY status`
      )
      .then(results => {
        let response = {
          unread: 0,
          read: 0,
          archived: 0,
          deleted: 0
        }

        results[0].map(result => (response[result.status] = result.count))
        return response
      })
  }

  return null
}

export const updateConversation = (obj, args, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  return Message.update(
    { status: args.status },
    {
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { recipient_user_id: user.userId },
              { sender_user_id: args.conversationalistUserId }
            ]
          },
          {
            [Op.and]: [
              { recipient_user_id: args.conversationalistUserId },
              { sender_user_id: user.userId }
            ]
          }
        ]
      }
    }
  ).then(() => {
    return getConversation(user.userId, args.conversationalistUserId, {
      sender: true,
      recipient: true
    })
  })
}

export const createMessage = (obj, args, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  return Message.create({
    status: 'unread',
    message_type: args.messageType,
    body: args.body,
    sender_user_id: user.userId,
    recipient_user_id: args.conversationalistUserId
  }).then(response => fromDbMessageTransform(response))
}
