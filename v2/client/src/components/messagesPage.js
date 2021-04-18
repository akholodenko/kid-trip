import React, { useEffect, useRef, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
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
import { UPDATE_CONVERSATION_MUTATION } from '../graphql/messagesMutations'

import Message from './messages/message'
import ComposeMessage from './messages/composeMessage'
import { GET_USER_PROFILE_BY_PUBLIC_ID } from '../graphql/userQueries'

const MessagesPage = ({ match, currentUser }) => {
  const [conversationalistUserId, setConversationalistUserId] = useState(null)
  const [conversationalists, setConversationalists] = useState([])
  const [currentConversation, setCurrentConversation] = useState([])

  const messagesEndRef = useRef(null)

  const { loading, error } = useQuery(GET_CONVERSATIONALISTS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (data && data.conversationalists) {
        setConversationalists(data.conversationalists)

        if (isNewConversationalist(data.conversationalists)) {
          getUserProfile({ variables: { publicId: match.params.publicId } })
        }
      }
    }
  })

  const [getConversation] = useLazyQuery(GET_CONVERSATION, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setCurrentConversation(data.conversation)
      markConversationAsRead(data.conversation)
    }
  })

  const [getUserProfile] = useLazyQuery(GET_USER_PROFILE_BY_PUBLIC_ID, {
    onCompleted: data => {
      if (data && data.userProfile && data.userProfile.user) {
        setConversationalists(
          [
            {
              ...data.userProfile.user,
              id: parseInt(data.userProfile.user.id),
              createdAt: new Date()
            }
          ].concat(conversationalists)
        )
      }
    }
  })

  const [updateConversation] = useMutation(UPDATE_CONVERSATION_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted: data => {
      setCurrentConversation(data.updateConversation)
    }
  })

  // mark messages as read after 3 seconds
  const markConversationAsRead = conversation => {
    if (
      conversation &&
      conversation.filter(
        message =>
          message.status === 'unread' &&
          parseInt(message.sender.id) === conversationalistUserId
      ).length
    ) {
      setTimeout(() => {
        return updateConversation({
          variables: { conversationalistUserId, status: 'read' }
        })
      }, 3000)
    }
  }

  // update conversationalist based on routing change and load respective conversation
  useEffect(() => {
    const tempUserId = match.params.publicId
      ? decodeUserId(match.params.publicId)
      : null
    setConversationalistUserId(tempUserId)

    if (tempUserId) {
      getConversation({ variables: { conversationalistUserId: tempUserId } })
    }
  }, [match.params.publicId, getConversation])

  // scroll long list of messages to latest message at the bottom of container
  useEffect(() => {
    scrollToBottom()
  }, [currentConversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const isNewConversationalist = conversationalists =>
    !conversationalists.filter(
      conversationalist => conversationalist.id === conversationalistUserId
    ).length

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
      <div className="conversation">
        <div className="messages">
          {currentConversation && currentConversation.length ? (
            currentConversation.map(message => (
              <Message
                message={message}
                currentUser={currentUser}
                key={message.id}
              />
            ))
          ) : (
            <div className="noMessages">
              <div>No messages</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ComposeMessage
          conversationalistUserId={conversationalistUserId}
          onMessageCreated={() => {
            getConversation({
              variables: { conversationalistUserId: conversationalistUserId }
            })
          }}
        />
      </div>
    </div>
  )
}

export default withCurrentUser(withPageTemplate(MessagesPage))
