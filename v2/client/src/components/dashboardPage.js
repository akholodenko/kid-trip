import React, { useState } from 'react'
import { Query } from "react-apollo"
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Add } from "@material-ui/icons"
import { GET_VENUES_FOR_CURRENT_USER } from '../graphql/venueQueries'

import VenueListItem from './dashboard/venueListItem'
import AddVenueDialog from './dashboard/addVenueDialog'

const pageStyle = {
	sectionHeader: {
		marginBottom: '15px',
		display: 'flex',
	},
	sectionHeaderTitle: {
		flexGrow: 2,
	},
}

export default () => {
	const [dialogOpen, setDialogOpen] = useState(false)

	const toggleDialog = () => {
		setDialogOpen(!dialogOpen)
	}

	const venuesByType = venues => {
		let results = {}

		for(let x = 0; x < venues.length; x++) {
			if((venues[x].venueTypes && venues[x].venueTypes.length)) {
				if(results[venues[x].venueTypes[0].name]) {
					results[venues[x].venueTypes[0].name].venues.push(venues[x])
				}
				else {
					results[venues[x].venueTypes[0].name] = {
						type: {
							id: venues[x].venueTypes[0].id,
							name: venues[x].venueTypes[0].name,
						},
						venues: [venues[x]],
					}
				}
			}
		}
		console.log(results)
		let types = Object.keys(results)
		return <div>{types.sort().map(type => (
			<span key={type}>{type}</span>
		))

		}</div>
	}

	return (
		<Query query={GET_VENUES_FOR_CURRENT_USER}>
			{({ loading, error, data }) => {
				if (loading) return "Loading..."
				if (error) return `Error! ${error.message}`

				return (
					<div className='mainContainer'>
						<div className='mainContent'>
							<div style={pageStyle.sectionHeader}>
								<Typography variant='h5' style={pageStyle.sectionHeaderTitle}>My destinations</Typography>
								<Button variant="outlined" onClick={toggleDialog}>
									<Add/>
									Add Destination
								</Button>
								<AddVenueDialog
									open={dialogOpen}
									toggleDialog={toggleDialog}/>
							</div>
							{venuesByType(data.me.venues)}
							<div>
								{data.me.venues.sort((a, b) => {
									if (a.name > b.name) return 1
									if (b.name > a.name) return -1
									return 0
								}).map(venue => (
									<VenueListItem key={venue.id} venue={venue}/>
								))}
							</div>
						</div>
					</div>
				)
			}}
		</Query>
	)
}