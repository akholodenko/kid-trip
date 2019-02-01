import React, { Component } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class BasicDialog extends Component {
	render() {
		return (
			<Dialog open={this.props.open} onClose={this.props.toggleDialog} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
				<DialogContent>
					{this.props.content}
					{/*<DialogContentText>*/}
						{/*To subscribe to this website, please enter your email address here. We will send updates*/}
						{/*occasionally.*/}
					{/*</DialogContentText>*/}
					{/*<TextField*/}
						{/*autoFocus*/}
						{/*margin="dense"*/}
						{/*id="name"*/}
						{/*label="Email Address"*/}
						{/*type="email"*/}
						{/*fullWidth*/}
					{/*/>*/}
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.toggleDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={this.props.toggleDialog} color="primary">
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default BasicDialog