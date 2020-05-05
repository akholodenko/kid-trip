import React, { useState, useEffect } from 'react'
import { withApollo } from 'react-apollo'
import { GET_SIMILAR_VENUES_IN_RADIUS } from '../../graphql/venueQueries'
import '../shared/sidebarModule.css'
import { Link as RouterLink } from 'react-router-dom'
import Routes from '../../routes'

const SimilarVenues = ({ client, venue }) => {
  const [similarVenues, setSimilarVenues] = useState([])
  useEffect(() => {
    client
      .query({
        query: GET_SIMILAR_VENUES_IN_RADIUS,
        variables: { venueId: venue.id, limit: 5, radius: 10 }
      })
      .then(({ data }) => {
        setSimilarVenues(data.similarVenues)
      })
  }, [venue, client])

  return (
    <div className="sidebar-module">
      <h3>Similar places near by</h3>
      <div className="sidebar-module-body">
        {similarVenues &&
          similarVenues.map(venue => (
            <div key={venue.id}>
              <RouterLink to={Routes.venuePath(venue.slug)}>
                {venue.name}
              </RouterLink>
            </div>
          ))}
      </div>
    </div>
  )
}

export default withApollo(SimilarVenues)
