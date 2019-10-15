import React from 'react'
import AppBar from "@material-ui/core/AppBar/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { withStyles } from "@material-ui/core"

const styles = {
	appBar: {
		boxShadow: "none",
		float: "left",
		width: '300px',
	},
	tabIndicator: {
		backgroundColor: '#ffffff',
	},
}

const VenueTypeTabs = ({ classes, venues, venueTypeFilter, onSetVenueTypeFilter }) => {
	const handleVenueTypeClick = (e, value) => {
		onSetVenueTypeFilter(value)
	}

	const getVenueTypes = venues => {
		let results = {}

		for (let x = 0; x < venues.length; x++) {
			if ((venues[x].venueTypes && venues[x].venueTypes.length)) {
				if (results[venues[x].venueTypes[0].name]) {
					results[venues[x].venueTypes[0].name].venues.push(venues[x])
				} else {
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

		return Object.keys(results)
	}

	return (
		<React.Fragment>
			<AppBar position="static" className={classes.appBar}>
				<Tabs value={venueTypeFilter}
							onChange={handleVenueTypeClick}
							classes={{ indicator: classes.tabIndicator }}
							orientation="vertical"
							variant="scrollable"
							scrollButtons="auto">
					<Tab label='all' value='all'/>
					{getVenueTypes(venues).sort().map((type, index) => (
						<Tab label={type} value={type} key={index}/>
					))}
				</Tabs>
			</AppBar>
		</React.Fragment>
	)
}

export default withStyles(styles)(VenueTypeTabs)