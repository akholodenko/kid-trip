import React from 'react'
import '../shared/sidebarModule.css'
import FeedItem from '../dashboard/feedItem'

const SideVenueWidget = ({ title, venues }) => {
  console.log('here', venues)
  return (
    <div className="sidebar-module">
      <h3>{title}</h3>
      <div className="sidebar-module-body">
        {venues.map(venue => (
          <FeedItem key={venue.id} venue={venue}></FeedItem>
        ))}
      </div>
    </div>
  )
}

export default SideVenueWidget
