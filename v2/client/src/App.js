import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Routes from './routes'

import Login from "./components/login"
import Home from './components/home'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import theme from './theme'
import AppBar from './layout/appBarContainer'

const styles = {
	appBarSpacer: {
		height: '49px'
	}
}

class App extends Component {
	render() {
		const { classes, location } = this.props
		const isHomepage = (location.pathname === Routes.home)

		return (
			<MuiThemeProvider theme={theme}>
				<div>
					<CssBaseline/>
					<AppBar/>
					{!isHomepage && (
						<div className={classes.appBarSpacer}></div>
					)}
					<Switch>
						<Route exact path={Routes.home} component={Home}/>
						<Route exact path={Routes.login} component={Login}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default withRouter(withStyles(styles)(App))
