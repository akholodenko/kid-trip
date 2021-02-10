import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { isValueInObject } from '../utils/validationUtils'
import { useQuery } from '@apollo/client'
import { GET_MESSAGES } from '../graphql/messagesQueries'
import { shortName } from '../utils/userUtils'
import { sinceCreated } from '../utils/dateUtils'

const MESSAGE_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  SENT: 'sent',
  ARCHIVED: 'archived'
}

const MessagesPage = ({ match }) => {
  const [status, setStatus] = useState(
    isValueInObject(MESSAGE_STATUS, match.params.status)
      ? match.params.status
      : MESSAGE_STATUS.UNREAD
  )

  const [messages, setMessages] = useState([])

  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { status },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (data) {
      setMessages(data.messages)
    }
  }, [data])

  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <div>
      <div>{status} messages</div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{sinceCreated(message.createdAt, 'at')}</div>
          <div>from {shortName(message.sender)}</div>
          <div>{message.body}</div>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default withPageTemplate(MessagesPage)
