import { encodeUserId } from './utils/routeUtils'

const Routes = {
  home: '/',
  dashboard: '/dashboard/:section?',
  dashboardPath: section => `/dashboard/${section}`,
  venue: '/venue/:venueSlug',
  venuePath: venueSlug => `/venue/${venueSlug}`,
  messages: '/messages/:publicId?',
  messagesPath: userId => `/messages/${!!userId ? encodeUserId(userId) : ''}`,
  userProfile: '/user/:userId',
  userProfilePath: userId => `/user/${encodeUserId(userId)}`,
  validatePageSection: (section, options, fallback) =>
    Object.values(options).includes(section) ? section : fallback
}

export default Routes
