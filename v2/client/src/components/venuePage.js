import React from 'react'
import { Query } from "react-apollo"
import Typography from '@material-ui/core/Typography'
import { GET_VENUE_BASICS } from '../graphql/venueQueries'

const pageStyle = {
	sectionHeader: {
		marginBottom: '15px',
	},
}


export default ({ match }) => {
	const venueId = match.params.venueId

	if (!venueId) {
		return (<div>Venue not found.</div>)
	} else {
		return (
			<Query query={GET_VENUE_BASICS} variables={{ venueId }}>
				{({ loading, error, data }) => {
					if (loading) return "Loading..."
					if (error) return `Error! ${error.message}`

					const venue = data.venue
					console.log('data', data)
					return (
						<div className='mainContainer'>
							<div className='mainContent'>
								<Typography variant='h5' style={pageStyle.sectionHeader}>{venue.name}</Typography>
							</div>
						</div>
					)
				}}
			</Query>
		)
	}
}