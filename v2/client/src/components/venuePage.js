import React from 'react'
import { Query } from "react-apollo"
import Typography from '@material-ui/core/Typography'
import { GET_VENUE_BY_SLUG } from '../graphql/venueQueries'

import VenueHeader from './venue/header'

const pageStyle = {
	sectionHeader: {
		marginBottom: '15px',
	},
}


export default ({ match }) => {
	const venueSlug = match.params.venueSlug

	if (!venueSlug) {
		return (<div>Venue not found.</div>)
	} else {
		return (
			<Query query={GET_VENUE_BY_SLUG} variables={{ venueSlug }}>
				{({ loading, error, data }) => {
					if (loading) return "Loading..."
					if (error) return `Error! ${error.message}`

					const venue = data.venueBySlug
					console.log('data', data)
					return (
						<div>
							<VenueHeader venue={venue}/>
							<div className='mainContainer'>
								<div className='mainContent'>
									<Typography variant='h5' style={pageStyle.sectionHeader}>{venue.name}</Typography>
								</div>
							</div>
						</div>
					)
				}}
			</Query>
		)
	}
}