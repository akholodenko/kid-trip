import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MESSAGE_COUNT } from '../../graphql/messagesQueries'

const UnreadMessagesIndicator = () => {
  const [unreadFlag, setUnreadFlag] = useState(false)
  const { data } = useQuery(GET_MESSAGE_COUNT, {
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (data && data.messageCount && data.messageCount) {
      setUnreadFlag(!!data.messageCount.unread)
    }
  }, [data])

  return (
    <div
      className="unreadIndicator"
      style={{ display: `${unreadFlag ? 'block' : 'none'}` }}
    ></div>
  )
}

export default UnreadMessagesIndicator
