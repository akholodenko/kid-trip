import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { venueAddress, venuePrimaryTypeName } from '../../../utils/venueUtils'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  GET_SIMILAR_VENUES_BY_NAME,
  GET_VENUES_FOR_CURRENT_USER
} from '../../../graphql/venueQueries'

import './similarVenueByName.css'
import Routes from '../../../routes'
import { Link as RouterLink } from 'react-router-dom'
import { CREATE_USER_VENUE_FAVORITE_MUTATION } from '../../../graphql/venueMutations'
import { updateVenueStatsCache } from '../../../graphql/venueCache'

const SimilarVenuesByName = ({ venue }) => {
  const history = useHistory()
  const [selectedSimilarVenue, setSelectedSimilarVenue] = useState(null)
  const [getSimilarVenuesByName, similarVenuesByNameResults] = useLazyQuery(
    GET_SIMILAR_VENUES_BY_NAME
  )

  const refetchQueries = [
    {
      query: GET_VENUES_FOR_CURRENT_USER
    }
  ]

  const [addFavoriteVenue] = useMutation(CREATE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    update: (store, { data: { createUserVenueFavorite } }) => {
      updateVenueStatsCache(
        store,
        selectedSimilarVenue.slug,
        createUserVenueFavorite
      )
      history.push(Routes.venuePath(selectedSimilarVenue.slug))
    },
    refetchQueries
  })

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

  const addFavoriteCallback = useCallback(
    venue => {
      return addFavoriteVenue({
        variables: {
          venueId: venue.id
        }
      })
    },
    [addFavoriteVenue]
  )

  useEffect(() => {
    if (selectedSimilarVenue) {
      addFavoriteCallback(selectedSimilarVenue)
    }
  }, [selectedSimilarVenue, addFavoriteCallback])

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
                  onClick={() => setSelectedSimilarVenue(similarVenue)}
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
