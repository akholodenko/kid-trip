import React from 'react'
import { Query } from "react-apollo"
import { GET_VENUES_FOR_CURRENT_USER } from '../graphql/venueQueries'

export default () => {
	return (
		<Query query={GET_VENUES_FOR_CURRENT_USER}>
			{({ loading, error, data }) => {
				if (loading) return "Loading..."
				if (error) return `Error! ${error.message}`

				return (
					<div>
						<div>My destinations</div>
						<div>
							{data.me.venues.map(venue => (
								<div key={venue.id}>
									<strong>{venue.name}</strong>&nbsp;
									({(venue.venueTypes && venue.venueTypes.length) ? `${venue.venueTypes[0].name} in ` : ''}
									{`${venue.city}, ${venue.state}`})
								</div>
							))}
						</div>
					</div>
				)
			}}
		</Query>
	)
}