import React, { Fragment, useEffect, useState } from 'react'
import VenueTypeTabs from './venueTypeTabs'
import VenueListItem from './venueListItem'
import { withStyles } from '@material-ui/core/styles'
import { GET_VENUES_FOR_CURRENT_USER } from '../../graphql/venueQueries'
import { withApollo } from 'react-apollo'

const styles = {
  '@global': {
    '.venueList': {
      marginLeft: '320px'
    }
  }
}

const VenueList = ({
  client,
  currentDashboardSection,
  isFavoritesDashboardSection
}) => {
  const [venueTypeFilter, setVenueTypeFilter] = useState('all')
  const [venues, setVenues] = useState([])
  const [triggerVenueRefresh, setTriggerVenueRefresh] = useState(true)

  useEffect(() => {
    const getVenueData = () => {
      client
        .query({
          query: GET_VENUES_FOR_CURRENT_USER
        })
        .then(({ data }) => {
          setVenues(
            isFavoritesDashboardSection
              ? data.me.favoriteVenues
              : data.me.venues
          )
        })
    }

    getVenueData()
    setVenueTypeFilter('all')
  }, [
    currentDashboardSection,
    triggerVenueRefresh,
    isFavoritesDashboardSection,
    client
  ])

  const onDeleteFavorite = () => {
    setTriggerVenueRefresh(!triggerVenueRefresh)
  }

  return (
    <Fragment>
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
              showDeleteFavoriteButton={isFavoritesDashboardSection}
              onDeleteFavoriteCallback={onDeleteFavorite}
            />
          ))}
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(withApollo(VenueList))
