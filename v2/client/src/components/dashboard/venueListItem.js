import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { venueMapLink, venueIcon } from '../../utils/venueUtils'
import { Link as RouterLink } from 'react-router-dom'
import Routes from '../../routes'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER_VENUE_FAVORITE_MUTATION } from '../../graphql/venueMutations'
import {
  GET_VENUE_BY_SLUG,
  GET_VENUES_FOR_CURRENT_USER
} from '../../graphql/venueQueries'

const styles = {
  '@global': {
    '.venueItem': {
      marginTop: '5px',
      marginBottom: '5px',
      backgroundColor: '#f6f6f6',
      padding: '15px'
    },
    '.venueIcon': {
      width: '15px',
      height: 'auto',
      marginRight: '5px',
      position: 'relative',
      top: '2px'
    },
    '.venueUnlike': {
      float: 'right'
    }
  }
}

const VenueListItem = props => {
  const { venue, showDeleteFavoriteButton, onDeleteFavoriteCallback } = props

  const [deleteFavorite] = useMutation(DELETE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    update: (store, { data: { deleteUserVenueFavorite } }) => {
      updateFavoriteStats(store, deleteUserVenueFavorite)
    },
    onCompleted: () => {
      onDeleteFavoriteCallback()
    },
    refetchQueries: [
      {
        query: GET_VENUES_FOR_CURRENT_USER
      }
    ],
    awaitRefetchQueries: true
  })

  const updateFavoriteStats = (store, venueStats) => {
    try {
      let data = store.readQuery({
        query: GET_VENUE_BY_SLUG,
        variables: { venueSlug: venue.slug }
      })

      data.venueBySlug.venueStats = venueStats

      store.writeQuery({
        query: GET_VENUE_BY_SLUG,
        variables: { venueSlug: venue.slug },
        data
      })
    } catch (e) {}
  }

  const onDeleteFavorite = () =>
    deleteFavorite({
      variables: {
        venueId: venue.id
      }
    })

  return (
    <div className="venueItem">
      {showDeleteFavoriteButton && (
        <button
          onClick={() => {
            onDeleteFavorite()
          }}
          className="venueUnlike"
        >
          Unlike
        </button>
      )}

      <div>
        <Typography
          variant="h6"
          component={RouterLink}
          to={Routes.venuePath(venue.slug)}
        >
          {venue.name}
        </Typography>
      </div>
      <div>
        {venueIcon(venue, 'venueIcon')}
        {venue.venueTypes && venue.venueTypes.length
          ? `${venue.venueTypes[0].name} in `
          : ''}
        <a href={venueMapLink(venue)} target="_blank" rel="noopener noreferrer">
          {venue.city}, {venue.state}
        </a>
      </div>
    </div>
  )
}

export default withStyles(styles)(VenueListItem)
