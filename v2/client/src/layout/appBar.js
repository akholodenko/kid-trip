import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import LoginButton from '../components/shared/loginButton'
import { isUserLoggedIn, withCurrentUser } from '../utils/userUtils'
import { withRouter } from 'react-router'

import AppBarMenu from './appBar/appBarMenu'
import AppBarMessages from './appBar/appBarMessages'

class ButtonAppBar extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <Toolbar variant="dense" className={classes.container}>
            <Typography
              className={classes.logoText}
              variant="button"
              color="inherit"
            >
              KidTrip
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
            ></Typography>

            <LoginButton className={classes.loginButton} />

            {isUserLoggedIn() && (
              <React.Fragment>
                <AppBarMessages classes={classes} />
                <AppBarMenu classes={classes} />
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withCurrentUser(withRouter(ButtonAppBar))
