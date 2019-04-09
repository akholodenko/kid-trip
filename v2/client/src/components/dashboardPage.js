import React, { Component } from 'react'
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

export default class DashboardPage extends Component {
	state = {
		dialogOpen: false,
	}

	toggleDialog = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen })
	}

	render() {
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
									<Button variant="outlined" onClick={this.toggleDialog}>
										<Add/>
										Add Destination
										<AddVenueDialog
											open={this.state.dialogOpen}
											toggleDialog={this.toggleDialog}/>
									</Button>
								</div>
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
}