import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class LoginLink extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN)

		return (authToken ? (
			<div
				className="ml1 pointer black"
				onClick={() => {
					localStorage.removeItem(AUTH_TOKEN)
					this.props.history.push(`/`)
				}}
			>
				logout
			</div>
		) : (
			<Link component={RouterLink} to="/login" color="primary">
				login
			</Link>
		))
	}
}


export default withRouter(LoginLink)