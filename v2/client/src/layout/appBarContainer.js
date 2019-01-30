import React from 'react'
import { isHomepage } from '../utils/routeUtils'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import blueGrey from '@material-ui/core/colors/blueGrey'

import AppBar from './appBar'

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
}

const homepageStyles = {
	...styles,
	container: {
		borderBottom: '1px solid',
		borderBottomColor: blueGrey[100],
	},
	grow: {
		...styles.grow,
		color: blueGrey[500],
	},
	menuButton: {
		...styles.menuButton,
		color: blueGrey[500],
	},
	loginButton: {
		color: blueGrey[500],
	},
}

const AppBarContainer = (props) => {
	const currentStyles = isHomepage(props.location) ? styles : homepageStyles
	const AppBarWithStyles = withStyles(currentStyles)(AppBar)
	return (<AppBarWithStyles/>)
}

export default withRouter(AppBarContainer)