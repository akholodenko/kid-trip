import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'
import { GET_VENUES_FOR_CURRENT_USER } from '../graphql/venueQueries'

import VenueListItem from './dashboard/venueListItem'
import AddVenueDialog from './dashboard/addVenueDialog'
import VenueTypeTabs from './dashboard/venueTypeTabs'

const pageStyle = {
  sectionHeader: {
    marginBottom: '15px',
    display: 'flex'
  },
  sectionHeaderTitle: {
    flexGrow: 2
  },
  venueList: {
    marginLeft: '320px'
  }
}

const DashboardPage = ({ client }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [venueTypeFilter, setVenueTypeFilter] = useState('all')
  const [dashboardData, setDashboardData] = useState({})
  const [venues, setVenues] = useState([])

  useEffect(() => {
    client
      .query({
        query: GET_VENUES_FOR_CURRENT_USER
      })
      .then(({ data }) => {
        setDashboardData(data.me)
        setVenues(data.me.venues)
      })
  }, [client])

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen)
  }

  const onShowMyVenues = () => {
    setVenueTypeFilter('all')
    setVenues(dashboardData.venues)
  }

  const onShowFavorites = () => {
    setVenueTypeFilter('all')
    setVenues(dashboardData.favoriteVenues)
  }

  return (
    <div className="mainContainer">
      <div className="mainContent">
        <div style={pageStyle.sectionHeader}>
          <Typography
            variant="h5"
            style={pageStyle.sectionHeaderTitle}
            onClick={onShowMyVenues}
          >
            My destinations
          </Typography>
          <Typography
            variant="h5"
            style={pageStyle.sectionHeaderTitle}
            onClick={onShowFavorites}
          >
            Favorite destinations
          </Typography>
          <Button variant="outlined" onClick={toggleDialog}>
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
        <div style={pageStyle.venueList}>
          {venues
            .filter(
              venue =>
                venueTypeFilter === 'all' ||
                venue.venueTypes[0].name === venueTypeFilter
            )
            .map(venue => (
              <VenueListItem key={venue.id} venue={venue} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default withApollo(DashboardPage)
