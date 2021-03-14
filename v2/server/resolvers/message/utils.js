import { fromDbUserTransform } from '../user/utils'

export const fromDbMessageTransform = message => {
  return {
    id: message.id,
    body: message.body,
    status: message.status,
    messageType: message.message_type,
    sender: message.MessageSender
      ? fromDbUserTransform(message.MessageSender)
      : { id: message.sender_user_id },
    recipient: message.MessageRecipient
      ? fromDbUserTransform(message.MessageRecipient)
      : {
          id: message.recipient_user_id
        },
    createdAt:
      message.dataValues && message.dataValues.created_at
        ? message.dataValues.created_at.toString()
        : null
  }
}
