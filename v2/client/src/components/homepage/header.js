import React from "react"
import Typography from '@material-ui/core/Typography'

const headerStyle = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(images/family-biking-cmp.jpg) 50% 50% no-repeat',
		backgroundSize: 'cover',
		height: '700px',
	},
	headerText: {
		color: '#ffffff',
	},
}


export default () => {
	return (
		<div style={headerStyle.container}>
			<Typography variant="h2" style={headerStyle.headerText}>
				<strong>Experience</strong> childhood, again.
			</Typography>
		</div>)
}