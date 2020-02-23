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
import { logoutUser, isUserLoggedIn } from '../utils/userUtils'
import { withRouter } from 'react-router'

import Routes from '../routes'

class ButtonAppBar extends Component {
  state = {
    anchorEl: null
  }

  toggleMenu = event => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget })
  }

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
              <span className={classes.menuWrapper}>
                <IconButton
                  onClick={this.toggleMenu}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.toggleMenu}
                >
                  <MenuItem
                    component={RouterLink}
                    to={Routes.home}
                    onClick={this.toggleMenu}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to={Routes.dashboard}
                    onClick={this.toggleMenu}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={this.toggleMenu}>My account</MenuItem>
                  <MenuItem
                    onClick={() => {
                      logoutUser()
                      this.props.history.push(`/`)
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </span>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(ButtonAppBar)
