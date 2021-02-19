import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_CONVERSATIONALISTS } from '../graphql/messagesQueries'
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

  useEffect(() => {
    if (data) {
      let temp = data.conversationalists.map(conversationalist => {
        return {
          ...conversationalist,
          createdAt: new Date(parseInt(conversationalist.createdAt))
        }
      })
      setConversationalists(temp)
    }
  }, [data])

  useEffect(() => {
    setConversationalistUserId(
      match.params.publicId ? decodeUserId(match.params.publicId) : null
    )
  }, [match.params.publicId])

  useEffect(() => {
    if (conversationalistUserId) {
      console.log('get convos with user ', conversationalistUserId)
    } else {
      console.log('load convo for 1st user')
    }
  }, [conversationalistUserId])

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
            <div>{sinceCreated(conversationalist.createdAt)}</div>
          </RouterLink>
        ))}
      </div>
      <div className="messages">
        conversation here ({conversationalistUserId})
      </div>
    </div>
  )
}

export default withPageTemplate(MessagesPage)
