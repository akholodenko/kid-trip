export default {
	home: '/',
	dashboard: '/dashboard',
	venue: '/venue/:venueSlug',
	venuePath: (venueSlug) => `/venue/${venueSlug}`
}