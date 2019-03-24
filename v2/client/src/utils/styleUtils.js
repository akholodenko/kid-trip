export const headerStyles = (imageUrl, height) => {
	return {
		container: {
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			background: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(/images/${imageUrl}) 50% 50% no-repeat`,
			backgroundSize: 'cover',
			height: height,
		},
		headerText: {
			color: '#ffffff',
		},
	}
}