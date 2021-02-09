import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import LoginButton from '../components/shared/loginButton'
import { logoutUser, isUserLoggedIn, withCurrentUser } from '../utils/userUtils'
import { withRouter } from 'react-router'

import Routes from '../routes'
import AppBarMenu from './appBar/appBarMenu'

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

            {isUserLoggedIn() && <AppBarMenu classes={classes} />}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withCurrentUser(withRouter(ButtonAppBar))
