import React from 'react'
import { shortName, isCurrentUser } from '../../utils/userUtils'
import { sinceCreated, messageTimeStampFormat } from '../../utils/dateUtils'

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={`message ${
        isCurrentUser(currentUser.id, message.sender.id)
          ? 'fromCurrentUser'
          : ''
      }`}
    >
      <div className="messageContainer">
        <div className={`messageSender ${message.status}`}>
          {shortName(message.sender)}
        </div>
        {message.body}
      </div>
      <div className="messageTimestamp">
        {sinceCreated(message.createdAt, null, messageTimeStampFormat)}{' '}
      </div>
    </div>
  )
}

export default Message
