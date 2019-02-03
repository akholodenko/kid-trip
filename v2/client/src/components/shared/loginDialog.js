import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { AUTH_TOKEN } from '../../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
        signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
            token
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token,
            user {
                id,
                firstName,
                lastName,
                email
            }
        }
    }
`

const styles = {
	dialogMainContent: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	dialogMainError: {
		textAlign: 'center',
	},
}

class LoginDialog extends Component {
	state = {
		login: true, // switch between Login and SignUp
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		errorMessage: null,
	}

	componentDidUpdate(prevProps) {
		if (prevProps.open !== this.props.open) {
			this.setState({ errorMessage: null })
		}
	}

	render() {
		const { login, email, password, firstName, lastName, errorMessage } = this.state
		const { classes } = this.props
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.toggleDialog}
				maxWidth='sm' fullWidth={true}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="login-dialog-title">{login ? 'Login' : 'Sign Up'}</DialogTitle>
				<DialogContent>
					{errorMessage && (
						<DialogContentText className={classes.dialogMainError}>{errorMessage}</DialogContentText>
					)}
					<div className={classes.dialogMainContent}>
						{!login && (
							<span>
						<TextField
							id="firstName"
							label="First name"
							error={!!errorMessage}
							value={firstName}
							onChange={e => this.setState({ firstName: e.target.value })}
							margin="normal"
							fullWidth
						/>
						<TextField
							id="lastName"
							label="Last name"
							error={!!errorMessage}
							value={lastName}
							onChange={e => this.setState({ lastName: e.target.value })}
							margin="normal"
							fullWidth
						/>
						</span>
						)}
						<TextField
							id="email"
							label="Email"
							error={!!errorMessage}
							value={email}
							onChange={e => this.setState({ email: e.target.value })}
							margin="normal"
							fullWidth
						/>
						<TextField
							id="password"
							label="Password"
							error={!!errorMessage}
							type="password"
							autoComplete="current-password"
							onChange={e => this.setState({ password: e.target.value })}
							margin="normal"
							fullWidth
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => this.setState({ login: !login, errorMessage: null })}
						color="primary" style={{ marginRight: 'auto' }}>
						{login
							? 'need to create an account?'
							: 'already have an account?'}
					</Button>

					<Button onClick={this.props.toggleDialog} color="primary">
						Cancel
					</Button>
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{ email, password, firstName, lastName }}
						update={(cache, { data: { login } }) => this._update(cache, login)}
						onCompleted={data => this._confirm(data)}
						onError={error => this._error(error)}
					>
						{mutation => (
							<Button color='primary' onClick={mutation}>
								{login ? 'login' : 'create account'}
							</Button>
						)}
					</Mutation>
				</DialogActions>
			</Dialog>
		)
	}

	_update = async (cache, info) => {
		cache.writeData({
			data: {
				currentUser: {
					...info.user,
					token: info.token,
				},
			},
		})
	}

	_confirm = async data => {
		this.state.error = null

		const { token } = this.state.login ? data.login : data.signup
		this._saveUserData(token)

		this.props.history.push(`/`)
	}

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}

	_error = async ({ graphQLErrors }) => {
		if (this.state.login && graphQLErrors && graphQLErrors[0] && graphQLErrors[0].message) {
			this.setState({ errorMessage: graphQLErrors[0].message })
		} else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].extensions.exception.errors[0].message) {
			this.setState({ errorMessage: graphQLErrors[0].extensions.exception.errors[0].message })
		}
	}
}

export default withRouter(withStyles(styles)(LoginDialog))