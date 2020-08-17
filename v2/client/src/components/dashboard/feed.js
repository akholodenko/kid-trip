import React, { useEffect, useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import { GET_FEED_VENUES } from '../../graphql/venueQueries'
import { CURRENT_USER_FEED_CONFIG_QUERY } from '../../graphql/userQueries'
import { UPDATE_CURRENT_USER_FEED_CONFIG_MUTATION } from '../../graphql/userMutations'

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

const Feed = () => {
  const client = useApolloClient()
  const [feedVenues, setFeedVenues] = useState([])
  const [feedConfiguration, setFeedConfiguration] = useState({
    cityIds: null,
    venueTypeIds: null,
    sort: 'DESC',
    first: 25,
    init: false
  })

  const [updateCurrentUserFeedConfigMutation] = useMutation(
    UPDATE_CURRENT_USER_FEED_CONFIG_MUTATION
  )

  useEffect(() => {
    client
      .query({
        query: CURRENT_USER_FEED_CONFIG_QUERY
      })
      .then(({ data }) => {
        setFeedConfiguration({
          init: true,
          sort: 'DESC',
          first: 25,
          ...data.userFeedConfig
        })
      })
  }, [client])

  useEffect(() => {
    if (feedConfiguration.init) {
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

    updateCurrentUserFeedConfigMutation({
      variables: {
        cityIds: newFeedConfiguration.cityIds,
        venueTypeIds: newFeedConfiguration.venueTypeIds
      }
    })
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

export default withStyles(styles)(Feed)
