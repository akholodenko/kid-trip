import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'

import CityFormField from './cityFormField'
import VenueTypeFormField from './venueTypeFormField'

const style = {
	title: {
		margin: '0 auto',
	},
	body: {
		margin: '0 auto',
	},
	input: {
		minWidth: '500px',
	},
}

export default (props) => {
	const [newVenue, setNewVenue] = useState({
		name: '',
		type: {
			id: null,
		},
		streetAddress: '',
		zipcode: '',
		lat: '',
		lng: '',
		city: {},
	})

	const onCitySelected = city => {
		console.log('city selected:', city)
		setNewVenue({ ...newVenue, city })
	}

	const onVenueTypeSelected = venueTypeId => {
		console.log('venueTypeId selected:', venueTypeId)
		setNewVenue({ ...newVenue, type: { id: venueTypeId } })
	}

	const handleChange = name => event => {
		console.log('here', event.target.value)
		setNewVenue({ ...newVenue, [name]: event.target.value })
	}

	return (
		<Dialog
			open={props.open}
			onClose={props.toggleDialog}
			fullScreen={true}
			aria-labelledby="form-dialog-title">
			<DialogTitle style={style.title}>Add New Destination</DialogTitle>
			<DialogContent style={style.body}>
				<DialogContentText>
					Please enter information about a venue
				</DialogContentText>
				<TextField
					id="venue-name"
					label="Venue name"
					value={newVenue.name}
					onChange={handleChange('name')}
					margin="normal"
					style={style.input}
				/>
				<br/>
				<VenueTypeFormField onVenueTypeSelected={onVenueTypeSelected}/>
				<CityFormField onCitySelected={onCitySelected}/>
			</DialogContent>
			<DialogActions>
				actions
			</DialogActions>
		</Dialog>
	)
}
