import React from 'react'
import { DirectionsRun, NearMe, Restaurant } from '@material-ui/icons'

export const venueMapLink = venue => {
  const address = `${venue.streetAddress}, ${venue.city}, ${venue.state} ${venue.zipcode}`
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`
}

export const venueIcon = (venue, cssClass) => {
  let venueIconComponent

  switch (venue.venueTypes[0].name) {
    case 'restaurant':
      venueIconComponent = <Restaurant className={cssClass} />
      break
    case 'outdoor playground':
      venueIconComponent = <DirectionsRun className={cssClass} />
      break
    default:
      venueIconComponent = <NearMe className={cssClass} />
  }

  return venueIconComponent
}

export const venueHeaderImage = venue =>
  venue.venueTypes[0].image || 'restaurant-header-cmp.jpg'

export const venuePrimaryTypeName = venue => venue.venueTypes[0].name || 'venue'

export const venueAddress = (venue, separator = ', ') => {
  if (venue) {
    return (
      <span>
        {venue.streetAddress}
        {separator}
        {venue.city}, {venue.state} {venue.zipcode}
      </span>
    )
  }

  return ''
}
