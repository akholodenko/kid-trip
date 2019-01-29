import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import LoginButton from './loginButton'

const ButtonAppBar = (props) => {
	const { classes } = props

	const toggleMenu = () => {
		console.log('toggle menu')
	}

	return (
		<div className={classes.root}>
			<AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }}>
				<Toolbar variant="dense" className={classes.container}>
					<IconButton
						onClick={toggleMenu}
						className={classes.menuButton} color="inherit" aria-label="Menu">
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>

					</Typography>
					<LoginButton className={classes.loginButton}/>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default ButtonAppBar