import React from 'react'
import '../shared/sidebarModule.css'
import { venueAddress } from '../../utils/venueUtils'

const LocationInfo = ({ venue }) => {
  return (
    <div className="sidebar-module">
      <h3>Location</h3>
      <div className="sidebar-module-body">{venueAddress(venue, <br />)}</div>
    </div>
  )
}

export default LocationInfo
