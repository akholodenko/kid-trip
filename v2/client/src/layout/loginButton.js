import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class LoginButton extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN)

		return (authToken ? (
			<Button
				color="inherit"
				className={this.props.className}
				onClick={() => {
					localStorage.removeItem(AUTH_TOKEN)
					this.props.history.push(`/`)
				}}>Logout</Button>
		) : (
			<Button
				component={RouterLink} to="/login"
				className={this.props.className} color="inherit">
				Login
			</Button>
		))
	}
}


export default withRouter(LoginButton)