import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { sinceCreated } from '../../utils/dateUtils'
import { shortName } from '../../utils/userUtils'
import Routes from '../../routes'
import { Link as RouterLink } from 'react-router-dom'

const styles = {
  '@global': {
    '.feedItem': {
      borderBottom: '1px solid #eee',
      marginTop: '5px',
      marginBottom: '5px',
      padding: '15px'
    },
    '.feedItemTitle': {
      fontWeight: 600,
      color: '#000',
      textDecoration: 'none',
      fontSize: '15px'
    },
    '.feedItemSubtitle': {
      fontSize: '12px'
    }
  }
}

const FeedItem = ({ venue }) => {
  return (
    <div className="feedItem">
      <RouterLink to={Routes.venuePath(venue.slug)} className="feedItemTitle">
        {venue.name}
      </RouterLink>
      <div className="feedItemSubtitle">
        {sinceCreated(venue.createdAt)} by {shortName(venue.creator)}
      </div>
    </div>
  )
}

export default withStyles(styles)(FeedItem)
