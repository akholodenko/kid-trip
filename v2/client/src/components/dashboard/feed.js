import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { GET_FEED_VENUES } from '../../graphql/venueQueries'
import { CURRENT_USER_FEED_CONFIG_QUERY } from '../../graphql/userQueries'

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
        query: CURRENT_USER_FEED_CONFIG_QUERY
      })
      .then(({ data }) => {
        setFeedConfiguration({
          sort: 'DESC',
          first: 25,
          ...data.userFeedConfig
        })
      })
  }, [client])

  useEffect(() => {
    if (feedConfiguration.cityIds && feedConfiguration.venueTypeIds) {
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
    }
  }, [client, feedConfiguration])

  const onFeedConfigurationUpdated = newFeedConfiguration => {
    if (newFeedConfiguration) {
      setFeedConfiguration({ ...newFeedConfiguration })
    }
  }

  return (
    <div>
      <FeedConfigurator
        feedConfiguration={feedConfiguration}
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
