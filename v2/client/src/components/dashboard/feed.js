import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { GET_FEED_VENUES } from '../../graphql/venueQueries'

import FeedItem from './feedItem'
import FeedConfigurator from './feedConfigurator'

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
  const [feedConfiguration, setFeedConfiguration] = useState({
    cityIds: null,
    venueTypeIds: null,
    sort: 'DESC',
    first: 25
  })

  useEffect(() => {
    client
      .query({
        query: GET_FEED_VENUES,
        variables: {
          ...feedConfiguration
        }
      })
      .then(({ data }) => {
        setFeedVenues(data.venues)
      })
  }, [client, feedConfiguration])

  const onFeedConfigurationUpdated = newFeedConfiguration => {
    if (newFeedConfiguration) {
      setFeedConfiguration({ ...newFeedConfiguration })
    }
  }

  return (
    <div>
      <FeedConfigurator
        onFeedConfigurationUpdated={onFeedConfigurationUpdated}
      ></FeedConfigurator>
      <div className="feedContainer">
        {feedVenues.map(venue => (
          <FeedItem key={venue.id} venue={venue}></FeedItem>
        ))}
      </div>
    </div>
  )
}

export default withStyles(styles)(withApollo(Feed))
