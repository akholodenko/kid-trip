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

// export const getConversations = (userId, fields) => {
//   return Message.findAll({
//     attributes: MESSAGE_ATTRIBUTES,
//     where: {
//       [Op.or]: [{ recipient_user_id: userId }, { sender_user_id: userId }]
//     },
//     order: [['created_at', 'DESC']]
//   }).then(messages => {
//     console.log(
//       'need to process messages into conversations',
//       'use date and text of latest message'
//     )
//     return null
//   })
// }

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
          firstName: conversationalist.first_name,
          lastName: conversationalist.last_name,
          createdAt: conversationalist.created_at
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
