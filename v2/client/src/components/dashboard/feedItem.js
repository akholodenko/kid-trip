import React from 'react'
import { sinceCreated } from '../../utils/dateUtils'

const FeedItem = ({ venue }) => {
  return (
    <div>
      {venue.name} added {sinceCreated(venue.createdAt)}
    </div>
  )
}

export default FeedItem
