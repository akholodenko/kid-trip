import React, { useEffect, useCallback } from 'react'
import { venueCityState, venuePrimaryTypeName } from '../../../utils/venueUtils'
import { useLazyQuery } from '@apollo/client'
import { GET_SIMILAR_VENUES_BY_NAME } from '../../../graphql/venueQueries'

const SimilarVenuesByName = ({ venue }) => {
  const [getSimilarVenuesByName, similarVenuesByNameResults] = useLazyQuery(
    GET_SIMILAR_VENUES_BY_NAME
  )

  const getSimilarVenuesCallback = useCallback(
    (name, city) => {
      return getSimilarVenuesByName({
        variables: {
          name: name,
          cityId: city && city.id ? city.id : null,
          limit: 5
        }
      })
    },
    [getSimilarVenuesByName]
  )

  useEffect(() => {
    if (venue.name && venue.name.length >= 3) {
      getSimilarVenuesCallback(venue.name, venue.city)
    }
  }, [venue.name, venue.city, getSimilarVenuesCallback])

  return (
    <div>
      {similarVenuesByNameResults.data &&
        similarVenuesByNameResults.data.similarVenuesByName &&
        similarVenuesByNameResults.data.similarVenuesByName.length && (
          <div>
            <div>
              Are you adding{' '}
              {similarVenuesByNameResults.data.similarVenuesByName.length > 1
                ? 'one of these destinations'
                : 'this destination'}
              ?
            </div>
            {similarVenuesByNameResults.data.similarVenuesByName.map(
              similarVenue => (
                <div key={similarVenue.id}>
                  <strong>{similarVenue.name}</strong>, a{' '}
                  {venuePrimaryTypeName(similarVenue)} in{' '}
                  {venueCityState(similarVenue)}
                </div>
              )
            )}
          </div>
        )}
    </div>
  )
}

export default SimilarVenuesByName
