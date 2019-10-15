import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from "@material-ui/core"

import { venueMapLink, venueIcon } from '../../utils/venueUtils'
import { Link as RouterLink } from "react-router-dom"
import Routes from "../../routes"

const styles = {
	'@global': {
		'.venueItem': {
			marginTop: '5px',
			marginBottom: '5px',
			backgroundColor: '#f6f6f6',
			padding: '15px',
		},
		'.venueIcon': {
			width: '15px',
			height: 'auto',
			marginRight: '5px',
			position: 'relative',
			top: '2px',
		},
	},
}

const VenueListItem = (props) => {
	const { venue } = props

	return (<div className='venueItem'>
		<div>
			<Typography
				variant='h6'
				component={RouterLink}
				to={Routes.venuePath(venue.slug)}>{venue.name}</Typography>
		</div>
		<div>
			{venueIcon(venue, 'venueIcon')}
			{(venue.venueTypes && venue.venueTypes.length) ? `${venue.venueTypes[0].name} in ` : ''}
			<a href={venueMapLink(venue)}
				 target='_blank'
				 rel="noopener noreferrer">{venue.city}, {venue.state}</a>
		</div>
	</div>)
}

export default withStyles(styles)(VenueListItem)