import React from 'react'
import '../shared/sidebarModule.css'
import { venueAddress } from '../../utils/venueUtils'
import { GOOGLE_DIRECTIONS_URL } from '../../utils/urlUtils'

const LocationInfo = ({ venue }) => {
  return (
    <div className="sidebar-module">
      <h3>Location</h3>
      <div className="sidebar-module-body">
        <a
          href={`${GOOGLE_DIRECTIONS_URL}${encodeURIComponent(
            venueAddress(venue, ',', 'raw')
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {venueAddress(venue, <br />)}
        </a>
      </div>
    </div>
  )
}

export default LocationInfo
