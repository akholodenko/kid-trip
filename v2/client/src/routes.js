export default {
  home: '/',
  dashboard: '/dashboard/:section?',
  dashboardPath: section => `/dashboard/${section}`,
  venue: '/venue/:venueSlug',
  venuePath: venueSlug => `/venue/${venueSlug}`,
  userProfile: '/user/:userId',
  userProfilePath: userId => `/user/${userId}`,
  validatePageSection: (section, options, fallback) =>
    Object.values(options).includes(section) ? section : fallback
}
