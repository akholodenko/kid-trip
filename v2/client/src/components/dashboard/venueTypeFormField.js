import React, { useState } from 'react'
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import { Query } from "react-apollo"

import { GET_VENUE_TYPES } from "../../graphql/venueQueries"

const style = {
	formControl: {
		minWidth: '500px',
		marginTop: '16px',
		marginBottom: '8px',
	}
}

const venueTypeFormField = ({ onVenueTypeSelected }) => {
	const [selectedOption, setSelectedOption] = useState('')

	const handleOptionChange = option => {
		setSelectedOption(option)
		onVenueTypeSelected(option)
	}

	return (
		<Query query={GET_VENUE_TYPES}>
			{({ loading, error, data }) => {
				if (loading) return "Loading..."
				if (error) return `Error! ${error.message}`

				const venueTypes = data.venueTypes

				return (
					<FormControl style={style.formControl}>
						<InputLabel htmlFor="age-simple">Venue Type</InputLabel>
						<Select
							value={selectedOption}
							onChange={event => handleOptionChange(event.target.value)}
							inputProps={{
								name: 'type',
								id: 'venue-type',
							}}
						>
							{venueTypes.map(venueType => (
								<MenuItem key={venueType.id} value={venueType.id}>{venueType.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				)
			}}
		</Query>
	)
}

export default venueTypeFormField