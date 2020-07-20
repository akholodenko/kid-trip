import React from 'react'
import { withStyles } from '@material-ui/core/styles'

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
      borderRadius: '8px',
      marginTop: '5px',
      marginBottom: '5px',
      backgroundColor: '#f6f6f6',
      padding: '15px',
      width: '49%',
      display: 'inline-block',
      '&:nth-child(odd)': {
        marginRight: '10px'
      }
    },
    '.venueItemTitle': {
      display: 'block',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: 1.6,
      color: '#333333',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '.venueItemDescription': {},
    '.venueItemTypeBadge': {
      display: 'inline-block',
      padding: '1px 5px',
      backgroundColor: '#2196f3',
      color: '#fff',
      borderRadius: '3px',
      height: '22px'
    },
    '.venueItemTypeBadgeText': {
      marginLeft: '20px',
      marginTop: '3px',
      textTransform: 'uppercase',
      fontSize: '11px',
      fontWeight: 600,
      minWidth: '75px',
      textAlign: 'center'
    },
    '.venueItemLocation': {
      textTransform: 'uppercase',
      fontSize: '11px',
      fontWeight: 600,
      textDecoration: 'none',
      float: 'right',
      marginTop: '4px',
      color: '#666'
    },
    '.venueIcon': {
      float: 'left',
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

      <RouterLink to={Routes.venuePath(venue.slug)} className="venueItemTitle">
        {venue.name}
      </RouterLink>
      <div className="venueItemDescription">
        <div className="venueItemTypeBadge">
          {venueIcon(venue, 'venueIcon')}
          <div className="venueItemTypeBadgeText">
            {venue.venueTypes && venue.venueTypes.length
              ? `${venue.venueTypes[0].name}`
              : ''}
          </div>
        </div>
        <a
          href={venueMapLink(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="venueItemLocation"
        >
          {venue.city}, {venue.state}
        </a>
      </div>
    </div>
  )
}

export default withStyles(styles)(VenueListItem)
