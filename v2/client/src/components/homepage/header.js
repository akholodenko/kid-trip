import React from "react"
import Typography from '@material-ui/core/Typography'
import {headerStyles} from '../../utils/styleUtils'

const headerStyle = headerStyles('family-biking-cmp.jpg', '700px')

export default () => {
	return (
		<div style={headerStyle.container}>
			<Typography variant="h2" style={headerStyle.headerText}>
				<strong>Experience</strong> childhood, again.
			</Typography>
		</div>)
}