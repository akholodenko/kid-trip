import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

import BasicDialog from '../components/shared/basicDialog'
import Login from '../components/login'

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
				// component={RouterLink} to="/login"
				onClick={this.toggleDialog}
				className={this.props.className} color="inherit">
				Login
			</Button>
			<BasicDialog
				open={this.state.dialogOpen}
				toggleDialog={this.toggleDialog}
				content={<Login/>}/>
			</span>
		))
	}
}


export default withRouter(LoginButton)