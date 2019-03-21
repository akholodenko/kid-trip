import React from 'react'
import { Query } from "react-apollo"
import Typography from '@material-ui/core/Typography'
import { GET_VENUES_FOR_CURRENT_USER } from '../graphql/venueQueries'

import VenueListItem from './dashboard/venueListItem'

const pageStyle = {
	sectionHeader: {
		marginBottom: '15px',
	},
}


export default () => {
	return (
		<Query query={GET_VENUES_FOR_CURRENT_USER}>
			{({ loading, error, data }) => {
				if (loading) return "Loading..."
				if (error) return `Error! ${error.message}`

				return (
					<div className='mainContainer'>
						<div className='mainContent'>
							<Typography variant='h5' style={pageStyle.sectionHeader}>My destinations</Typography>
							<div>
								{data.me.venues.sort((a, b) => {
									if (a.name > b.name) return 1;
									if (b.name > a.name) return -1;
									return 0;
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