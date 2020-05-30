import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'
import { GET_VENUES_FOR_CURRENT_USER } from '../graphql/venueQueries'

import VenueListItem from './dashboard/venueListItem'
import AddVenueDialog from './dashboard/addVenueDialog'
import VenueTypeTabs from './dashboard/venueTypeTabs'

const VENUE_GROUP = {
  MY_DESTINATIONS: 'my-destinations',
  FAVORITES: 'favorites'
}

const styles = {
  '@global': {
    '.sectionHeader': {
      marginBottom: '15px',
      display: 'flex'
    },
    '.sectionHeaderTitle': {
      flexGrow: 2,
      maxWidth: '250px',
      margin: 0,
      fontSize: '1.5rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: '0em'
    },
    '.sectionHeaderTitleSelected': {
      textDecoration: 'underline'
    },
    '.venueList': {
      marginLeft: '320px'
    }
  }
}

const DashboardPage = ({ client }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [venueTypeFilter, setVenueTypeFilter] = useState('all')
  const [dashboardData, setDashboardData] = useState({})
  const [venues, setVenues] = useState([])
  const [currentVenueGroup, setCurrentVenueGroup] = useState(
    VENUE_GROUP.MY_DESTINATIONS
  )

  useEffect(() => {
    getVenueData()
  }, [client])

  const getVenueData = () => {
    client
      .query({
        query: GET_VENUES_FOR_CURRENT_USER
      })
      .then(({ data }) => {
        setDashboardData(data.me)
        setVenues(
          currentVenueGroup === VENUE_GROUP.FAVORITES
            ? data.me.favoriteVenues
            : data.me.venues
        )
      })
  }

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen)
  }

  const onShowMyVenues = () => {
    setVenueTypeFilter('all')
    setVenues(dashboardData.venues)
    setCurrentVenueGroup(VENUE_GROUP.MY_DESTINATIONS)
  }

  const onShowFavorites = () => {
    setVenueTypeFilter('all')
    setVenues(dashboardData.favoriteVenues)
    setCurrentVenueGroup(VENUE_GROUP.FAVORITES)
  }

  const onDeleteFavorite = () => {
    getVenueData()
  }

  const renderVenueGroupHeader = (text, venueGroup, onClick) => {
    return (
      <h5
        className={`sectionHeaderTitle ${
          currentVenueGroup === venueGroup ? 'sectionHeaderTitleSelected' : ''
        }`}
        onClick={onClick}
      >
        {text}
      </h5>
    )
  }

  return (
    <div className="mainContainer">
      <div className="mainContent">
        <div className="sectionHeader">
          {renderVenueGroupHeader(
            'My destinations',
            VENUE_GROUP.MY_DESTINATIONS,
            onShowMyVenues
          )}
          {renderVenueGroupHeader(
            'Favorite destinations',
            VENUE_GROUP.FAVORITES,
            onShowFavorites
          )}
          <Button
            variant="outlined"
            style={{ marginLeft: 'auto' }}
            onClick={toggleDialog}
          >
            <Add />
            Add Destination
          </Button>
          <AddVenueDialog open={dialogOpen} toggleDialog={toggleDialog} />
        </div>
        <VenueTypeTabs
          venues={venues}
          onSetVenueTypeFilter={setVenueTypeFilter}
          venueTypeFilter={venueTypeFilter}
        ></VenueTypeTabs>
        <div className="venueList">
          {venues
            .filter(
              venue =>
                venueTypeFilter === 'all' ||
                venue.venueTypes[0].name === venueTypeFilter
            )
            .map(venue => (
              <VenueListItem
                key={venue.id}
                venue={venue}
                showDeleteFavoriteButton={
                  currentVenueGroup === VENUE_GROUP.FAVORITES
                }
                onDeleteFavoriteCallback={onDeleteFavorite}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(withApollo(DashboardPage))
