import React, { useEffect, useCallback } from 'react'
import { venueAddress, venuePrimaryTypeName } from '../../../utils/venueUtils'
import { useLazyQuery } from '@apollo/client'
import { GET_SIMILAR_VENUES_BY_NAME } from '../../../graphql/venueQueries'

import './similarVenueByName.css'
import Routes from '../../../routes'
import { Link as RouterLink } from 'react-router-dom'

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

  const onAddFavorite = () => {
    console.log('add favorite')
  }

  if (
    !similarVenuesByNameResults.data ||
    !similarVenuesByNameResults.data.similarVenuesByName ||
    !similarVenuesByNameResults.data.similarVenuesByName.length
  )
    return null

  return (
    <div className="similarVenueByName">
      <div className="similarVenueByNameTitle">
        Are you adding{' '}
        {similarVenuesByNameResults.data.similarVenuesByName.length > 1
          ? 'one of these destinations'
          : 'this destination'}
        ?
      </div>
      <div className="similarVenueByNameItems">
        {similarVenuesByNameResults.data.similarVenuesByName.map(
          similarVenue => (
            <div key={similarVenue.id} className="similarVenueByNameItem">
              <RouterLink
                to={Routes.venuePath(similarVenue.slug)}
                target="_blank"
                key={similarVenue.id}
                className="similarVenueByNameItemName"
              >
                {similarVenue.name}
              </RouterLink>
              <div className="similarVenueByNameItemType">
                {venuePrimaryTypeName(similarVenue)}
              </div>
              {venueAddress(similarVenue, <br />)}
              <div className="similarAddToFavoriteButtonContainer">
                <button
                  className="similarAddToFavoriteButton"
                  onClick={() => onAddFavorite()}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default SimilarVenuesByName
