import React from 'react'
import Typography from '@material-ui/core/Typography'
import { headerStyles } from '../../utils/styleUtils'
import { venueHeaderImage } from '../../utils/venueUtils'
import ReviewsSummary from './reviewsSummary'

const VenueHeader = ({ venue }) => {
  const headerStyle = headerStyles(`${venueHeaderImage(venue)}`, '300px')

  return (
    <div style={{ ...headerStyle.container, flexDirection: 'column' }}>
      <Typography variant="h2" style={headerStyle.headerText}>
        <strong>{venue.name}</strong>
      </Typography>
      {!!venue.venueStats.reviews.count && (
        <ReviewsSummary reviews={venue.venueStats.reviews} />
      )}
    </div>
  )
}

export default VenueHeader
