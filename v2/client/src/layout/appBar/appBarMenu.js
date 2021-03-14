import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link as RouterLink } from 'react-router-dom'
import Routes from '../../routes'
import { logoutUser, withCurrentUser } from '../../utils/userUtils'
import { withRouter } from 'react-router'

const AppBarMenu = ({ classes, currentUser, history }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleMenu = event => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget)
  }

  return (
    <span className={classes.menuWrapper}>
      <IconButton
        onClick={toggleMenu}
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={toggleMenu}
      >
        <MenuItem component={RouterLink} to={Routes.home} onClick={toggleMenu}>
          Home
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={Routes.dashboardPath('')}
          onClick={toggleMenu}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={Routes.userProfilePath(currentUser.id)}
          onClick={toggleMenu}
        >
          My profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            logoutUser()
            history.push(`/`)
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </span>
  )
}

export default withCurrentUser(withRouter(AppBarMenu))
