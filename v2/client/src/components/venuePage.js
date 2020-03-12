import React from 'react'
import { Query } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import { GET_VENUE_BY_SLUG } from '../graphql/venueQueries'

import VenueHeader from './venue/header'
import SimilarVenues from './venue/similarVenues'
import { venuePrimaryTypeName } from '../utils/venueUtils'

const pageStyle = {
  sectionHeader: {
    marginBottom: '15px'
  },
  columnWrapper: {
    display: 'flex'
  },
  mainColumn: {
    flexGrow: 3
  },
  sideColumm: {
    flexGrow: 1
  }
}

export default ({ match }) => {
  const venueSlug = match.params.venueSlug

  if (!venueSlug) {
    return <div>Venue not found.</div>
  } else {
    return (
      <Query query={GET_VENUE_BY_SLUG} variables={{ venueSlug }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`

          const venue = data.venueBySlug
          const venueTypeName = venuePrimaryTypeName(venue)
          console.log('data', data)
          return (
            <div>
              <VenueHeader venue={venue} />
              <div className="mainContainer">
                <div className="mainContent">
                  <Typography variant="h5" style={pageStyle.sectionHeader}>
                    {venue.name}
                  </Typography>
                  <div style={pageStyle.columnWrapper}>
                    <div style={pageStyle.mainColumn}>
                      This {venueTypeName} is located in {venue.city},{' '}
                      {venue.state}.
                    </div>
                    <div style={pageStyle.sideColumm}>
                      <SimilarVenues venue={venue} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
