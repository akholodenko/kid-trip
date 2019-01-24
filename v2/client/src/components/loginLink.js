import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

const authToken = localStorage.getItem(AUTH_TOKEN)

const LoginLink = () => {
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
		<Link to="/login" className="ml1 no-underline black">
			login
		</Link>
	))
}


export default withRouter(LoginLink)