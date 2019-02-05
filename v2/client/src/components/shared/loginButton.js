import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import { isUserLoggedIn, logoutUser, withCurrentUser } from "../../utils/userUtils"
import LoginDialog from './loginDialog'

class LoginButton extends Component {
	state = {
		dialogOpen: false,
	}

	toggleDialog = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen })
	}

	renderUserInfo = (currentUser) => {
		if (currentUser && currentUser.id) {
			return `Welcome, ${currentUser.firstName} | `
		} else {
			return ''
		}
	}

	render() {
		const { currentUser } = this.props

		return (isUserLoggedIn() ? (
			<Button
				color="inherit"
				className={this.props.className}
				onClick={() => {
					logoutUser()
					this.props.history.push(`/`)
				}}>{this.renderUserInfo(currentUser)} Logout</Button>
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


export default withCurrentUser(withRouter(LoginButton))