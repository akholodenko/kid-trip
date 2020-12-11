import React from 'react'
import Typography from '@material-ui/core/Typography'
import { headerStyles } from '../../utils/styleUtils'
import { S3_ASSETS_URL } from '../../utils/urlUtils'

const headerStyle = headerStyles(
  `${S3_ASSETS_URL}venue-header-backgrounds/family-biking-cmp.jpg`,
  '700px'
)

const Header = () => {
  return (
    <div style={headerStyle.container}>
      <Typography variant="h2" style={headerStyle.headerText}>
        <strong>Experience</strong> childhood, again.
      </Typography>
    </div>
  )
}

export default Header
