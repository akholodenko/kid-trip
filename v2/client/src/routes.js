export default {
  home: '/',
  dashboard: '/dashboard/:section?',
  dashboardPath: section => `/dashboard/${section}`,
  venue: '/venue/:venueSlug',
  venuePath: venueSlug => `/venue/${venueSlug}`,
  validatePageSection: (section, options, fallback) =>
    Object.values(options).includes(section) ? section : fallback
}
