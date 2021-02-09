import React from 'react'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import IconButton from '@material-ui/core/IconButton'

import './appBarMessages.css'
import UnreadMessagesIndicator from './unreadMessagesIndicator'
import { Link as RouterLink } from 'react-router-dom'
import Routes from '../../routes'

const AppBarMessages = ({ classes }) => {
  return (
    <React.Fragment>
      <div className="messagesButtonWrapper">
        <IconButton
          className={classes.messagesButton}
          color="inherit"
          aria-label="Messages"
          component={RouterLink}
          to={Routes.messagesPath('unread')}
        >
          <EmailOutlinedIcon />
        </IconButton>
        <UnreadMessagesIndicator />
      </div>
    </React.Fragment>
  )
}

export default AppBarMessages
