import React from 'react'
import Typography from '@material-ui/core/Typography'
import { headerStyles } from '../../utils/styleUtils'
import { venueHeaderImage } from '../../utils/venueUtils'

export default props => {
  const { venue } = props
  const headerStyle = headerStyles(venueHeaderImage(venue), '300px')

  return (
    <div style={headerStyle.container}>
      <Typography variant="h2" style={headerStyle.headerText}>
        <strong>{venue.name}</strong>
      </Typography>
    </div>
  )
}
