import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  GET_CONVERSATIONALISTS,
  GET_CONVERSATION
} from '../graphql/messagesQueries'
import { shortName, withCurrentUser } from '../utils/userUtils'
import { decodeUserId } from '../utils/routeUtils'
import { sinceCreated } from '../utils/dateUtils'

import './messages/messages.css'
import Routes from '../routes'
import { Link as RouterLink } from 'react-router-dom'

const isCurrentUser = (currentUserId, userId) => currentUserId === userId

const MessagesPage = ({ match, currentUser }) => {
  const [conversationalistUserId, setConversationalistUserId] = useState(null)
  const [conversationalists, setConversationalists] = useState([])

  const { loading, error, data } = useQuery(GET_CONVERSATIONALISTS, {
    fetchPolicy: 'no-cache'
  })

  const messageTimeStampFormat = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }

  const [getConversation, currentConversation] = useLazyQuery(
    GET_CONVERSATION,
    {
      fetchPolicy: 'no-cache'
    }
  )

  useEffect(() => {
    if (data) {
      setConversationalists(data.conversationalists)
    }
  }, [data])

  useEffect(() => {
    setConversationalistUserId(
      match.params.publicId ? decodeUserId(match.params.publicId) : null
    )
  }, [match.params.publicId])

  useEffect(() => {
    if (conversationalistUserId) {
      getConversation({ variables: { conversationalistUserId } })
    } else {
      console.log('load convo for 1st user')
    }
  }, [conversationalistUserId, getConversation])

  useEffect(() => {
    if (
      currentConversation.data &&
      currentConversation.data.conversation.filter(
        message => message.status === 'unread'
      ).length
    ) {
      setTimeout(() => {
        console.log('mark as read')
      }, 3000)
    }
  }, [currentConversation])

  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <div className="conversations">
      <div className="conversationalists">
        {conversationalists.map(conversationalist => (
          <RouterLink
            to={Routes.messagesPath(conversationalist.id)}
            key={conversationalist.id}
            className={`conversationalist ${
              conversationalistUserId === conversationalist.id ? 'active' : ''
            }`}
          >
            <div>{shortName(conversationalist)}</div>
            <div>{sinceCreated(conversationalist.createdAt, 'at')}</div>
          </RouterLink>
        ))}
      </div>
      <div className="messages">
        {currentConversation.data &&
          currentConversation.data.conversation &&
          currentConversation.data.conversation.map(message => (
            <div
              key={message.id}
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
          ))}
      </div>
    </div>
  )
}

export default withCurrentUser(withPageTemplate(MessagesPage))
