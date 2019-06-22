import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText';

import CityFormField from './cityFormField'

const addVenueDialog = (props) => {
	const onCitySelected = (city) => {
		console.log('city selected:', city)
	}

	return (
		<Dialog
			open={props.open}
			onClose={props.toggleDialog}
			fullScreen={true}
			aria-labelledby="form-dialog-title">
			<DialogTitle>Add New Destination</DialogTitle>
			<DialogContent>
				<DialogContentText>
				content (title, type, location),
				</DialogContentText>
				<CityFormField onCitySelected={onCitySelected} />
			</DialogContent>
			<DialogActions>
				actions
			</DialogActions>
		</Dialog>
	)
}

export default addVenueDialog