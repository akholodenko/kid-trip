import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Login from "./components/login"
import Home from './components/home'
import LoginLink from './components/loginLink'

class App extends Component {
	render() {
		return (
			<div className="App">
				KitTrip 2.0
				<br/>
				<LoginLink/>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/login" component={Login}/>
				</Switch>
			</div>
		)
	}
}

export default App
