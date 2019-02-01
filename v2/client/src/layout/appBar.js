import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import LoginButton from './loginButton'

class ButtonAppBar extends Component {
	state = {
		anchorEl: null,
	}

	toggleMenu = (event) => {
		this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget })
	}

	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }}>
					<Toolbar variant="dense" className={classes.container}>
						<IconButton
							onClick={this.toggleMenu}
							className={classes.menuButton} color="inherit" aria-label="Menu">
							<MenuIcon/>
						</IconButton>

						<Menu
							id="simple-menu"
							anchorEl={this.state.anchorEl}
							open={Boolean(this.state.anchorEl)}
							onClose={this.toggleMenu}>
							<MenuItem onClick={this.toggleMenu}>Profile</MenuItem>
							<MenuItem onClick={this.toggleMenu}>My account</MenuItem>
							<MenuItem onClick={this.toggleMenu}>Logout</MenuItem>
						</Menu>

						<Typography variant="h6" color="inherit" className={classes.grow}>

						</Typography>
						<LoginButton className={classes.loginButton}/>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default ButtonAppBar