import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'
import { GET_VENUES_FOR_CURRENT_USER } from '../graphql/venueQueries'
import Routes from '../routes'

import VenueListItem from './dashboard/venueListItem'
import AddVenueDialog from './dashboard/addVenueDialog'
import VenueTypeTabs from './dashboard/venueTypeTabs'

const DASHBOARD_SECTION = {
  FOLLOWED_DESTINATIONS: 'followed-destinations',
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
      letterSpacing: '0em',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#111'
    },
    '.sectionHeaderTitleSelected': {
      textDecoration: 'underline'
    },
    '.venueList': {
      marginLeft: '320px'
    }
  }
}

const DashboardPage = ({ client, match }) => {
  const currentDashboardSection = Routes.validatePageSection(
    match.params.section,
    DASHBOARD_SECTION,
    DASHBOARD_SECTION.MY_DESTINATIONS
  )

  const [dialogOpen, setDialogOpen] = useState(false)
  const [venueTypeFilter, setVenueTypeFilter] = useState('all')
  const [venues, setVenues] = useState([])

  const getVenueData = () => {
    client
      .query({
        query: GET_VENUES_FOR_CURRENT_USER
      })
      .then(({ data }) => {
        setVenues(
          currentDashboardSection === DASHBOARD_SECTION.FAVORITES
            ? data.me.favoriteVenues
            : data.me.venues
        )
      })
  }

  useEffect(() => {
    getVenueData()
  }, [client, match, getVenueData])

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen)
  }

  const onDeleteFavorite = () => {
    getVenueData()
  }

  const renderVenueGroupHeader = (text, dashboardSection) => {
    return (
      <RouterLink
        to={Routes.dashboardPath(dashboardSection)}
        onClick={() => {
          setVenueTypeFilter('all')
        }}
        className={`sectionHeaderTitle ${
          currentDashboardSection === dashboardSection
            ? 'sectionHeaderTitleSelected'
            : ''
        }`}
      >
        {text}
      </RouterLink>
    )
  }

  return (
    <div className="mainContainer">
      <div className="mainContent">
        <div className="sectionHeader">
          {renderVenueGroupHeader(
            'My destinations',
            DASHBOARD_SECTION.MY_DESTINATIONS
          )}
          {renderVenueGroupHeader(
            'Favorite destinations',
            DASHBOARD_SECTION.FAVORITES
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
                  currentDashboardSection === DASHBOARD_SECTION.FAVORITES
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
