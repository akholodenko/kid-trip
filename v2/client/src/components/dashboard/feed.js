import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { GET_FEED_VENUES } from '../../graphql/venueQueries'

import FeedItem from './feedItem'

const styles = {
  '@global': {
    '.feedContainer': {
      maxWidth: '50%',
      minWidth: '400px'
    }
  }
}

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
    <div className="feedContainer">
      {feedVenues.map(venue => (
        <FeedItem key={venue.id} venue={venue}></FeedItem>
      ))}
    </div>
  )
}

export default withStyles(styles)(withApollo(Feed))
