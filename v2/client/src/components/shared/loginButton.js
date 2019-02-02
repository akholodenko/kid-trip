import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../../constants'

import LoginDialog from './loginDialog'

class LoginButton extends Component {
	state = {
		dialogOpen: false,
	}

	toggleDialog = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen })
	}

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
			<span>
			<Button
				onClick={this.toggleDialog}
				className={this.props.className}
				color="inherit">
				Login
			</Button>
			<LoginDialog
				open={this.state.dialogOpen}
				toggleDialog={this.toggleDialog}/>
			</span>
		))
	}
}


export default withRouter(LoginButton)