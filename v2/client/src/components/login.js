import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
            token
        }
    }
`

class Login extends Component {
	state = {
		login: true, // switch between Login and SignUp
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		errorMessage: null,
	}

	render() {
		const { login, email, password, firstName, lastName, errorMessage } = this.state
		return (
			<div>
				<h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
				{errorMessage && (
					<h2>{errorMessage}</h2>
				)}
				<div className="flex flex-column">
					{!login && (
						<span>
						<input
							value={firstName}
							onChange={e => this.setState({ firstName: e.target.value })}
							type="text"
							placeholder="Your first name"
						/>
						<input
							value={lastName}
							onChange={e => this.setState({ lastName: e.target.value })}
							type="text"
							placeholder="Your last name"
						/>
						</span>
					)}
					<TextField
						id="email"
						label="Email"
						// className={classes.textField}
						value={email}
						onChange={e => this.setState({ email: e.target.value })}
						margin="normal"
					/>
					<TextField
						id="password"
						label="Password"
						// className={classes.textField}
						type="password"
						autoComplete="current-password"
						onChange={e => this.setState({ password: e.target.value })}
						margin="normal"
					/>
				</div>
				<div className="flex mt3">
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{ email, password, firstName, lastName }}
						onCompleted={data => this._confirm(data)}
						onError={error => this._error(error)}
					>
						{mutation => (
							<Button color='primary' variant='contained' onClick={mutation}>
								{login ? 'login' : 'create account'}
							</Button>
						)}
					</Mutation>
					<div
						className="pointer button"
						onClick={() => this.setState({ login: !login })}
					>
						{login
							? 'need to create an account?'
							: 'already have an account?'}
					</div>
				</div>
			</div>
		)
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
			this.setState({ errorMessage: graphQLErrors[0].message})
		} else if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].extensions.exception.errors[0].message) {
			this.setState({ errorMessage: graphQLErrors[0].extensions.exception.errors[0].message })
		}
	}
}

export default Login