import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { GET_FEED_VENUES } from '../../graphql/venueQueries'

import FeedItem from './feedItem'

const Feed = ({ client }) => {
  const [feedVenues, setFeedVenues] = useState([])
  useEffect(() => {
    client
      .query({
        query: GET_FEED_VENUES,
        variables: {
          // cityIds: '15354, 15071',
          // venueTypeIds: '1,5',
          sort: 'DESC',
          first: 25
        }
      })
      .then(({ data }) => {
        setFeedVenues(data.venues)
      })
  }, [client])

  return (
    <div>
      {feedVenues.map(venue => (
        <FeedItem key={venue.id} venue={venue}></FeedItem>
      ))}
    </div>
  )
}

export default withApollo(Feed)
