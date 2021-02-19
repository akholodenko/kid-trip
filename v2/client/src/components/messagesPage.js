import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  GET_CONVERSATIONALISTS,
  GET_CONVERSATION
} from '../graphql/messagesQueries'
import { shortName } from '../utils/userUtils'
import { decodeUserId } from '../utils/routeUtils'
import { sinceCreated } from '../utils/dateUtils'

import './messages/messages.css'
import Routes from '../routes'
import { Link as RouterLink } from 'react-router-dom'

const MessagesPage = ({ match }) => {
  const [conversationalistUserId, setConversationalistUserId] = useState(null)
  const [conversationalists, setConversationalists] = useState([])

  const { loading, error, data } = useQuery(GET_CONVERSATIONALISTS, {
    fetchPolicy: 'no-cache'
  })

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

  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <div className="conversations">
      <div className="conversationalists">
        {conversationalists.map(conversationalist => (
          <RouterLink
            to={Routes.messagesPath(conversationalist.id)}
            key={conversationalist.id}
            className="conversationalist"
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
            <div key={message.id}>
              {shortName(message.sender)}
              {sinceCreated(message.createdAt, 'at')}: {message.body}
            </div>
          ))}
      </div>
    </div>
  )
}

export default withPageTemplate(MessagesPage)
