import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const addVenueDialog = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={props.toggleDialog}
			maxWidth='sm' fullWidth={true}
			aria-labelledby="form-dialog-title">
			<DialogTitle>title</DialogTitle>
			<DialogContent>
				content
			</DialogContent>
			<DialogActions>
				actions
			</DialogActions>
		</Dialog>
	)
}

export default addVenueDialog