import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Login from "./components/login"
import Home from './components/home'
import LoginLink from './components/loginLink'

import CssBaseline from '@material-ui/core/CssBaseline'
import blue from '@material-ui/core/colors/blue'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
		palette: {
			primary: {
				main: blue[500],
			},
		},
		typography: {
			useNextVariants: true,
		},
	},
)

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<CssBaseline/>
					KitTrip 2.0
					<br/>
					<LoginLink/>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/login" component={Login}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App
