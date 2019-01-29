import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Routes from './routes'

import Login from "./components/login"
import Home from './components/home'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import AppBar from './layout/appBarContainer'

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<CssBaseline/>
					<AppBar/>
					<Switch>
						<Route exact path={Routes.home} component={Home}/>
						<Route exact path={Routes.login} component={Login}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App
