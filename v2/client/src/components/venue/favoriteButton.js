import React from 'react'
import { useMutation } from '@apollo/client'
import {
  CREATE_USER_VENUE_FAVORITE_MUTATION,
  DELETE_USER_VENUE_FAVORITE_MUTATION
} from '../../graphql/venueMutations'
import { GET_VENUES_FOR_CURRENT_USER } from '../../graphql/venueQueries'

import { updateVenueStatsCache } from '../../graphql/venueCache'

const FavoriteButton = ({
  venueId,
  venueSlug,
  favoriteByCurrentUser,
  onUpdateFavoritesStats
}) => {
  const refetchQueries = [
    {
      query: GET_VENUES_FOR_CURRENT_USER
    }
  ]

  const [addFavorite] = useMutation(CREATE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    update: (store, { data: { createUserVenueFavorite } }) => {
      updateVenueStatsCache(store, venueSlug, createUserVenueFavorite)
      onUpdateFavoritesStats(createUserVenueFavorite)
    },
    refetchQueries
  })

  const [deleteFavorite] = useMutation(DELETE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    update: (store, { data: { deleteUserVenueFavorite } }) => {
      updateVenueStatsCache(store, venueSlug, deleteUserVenueFavorite)
      onUpdateFavoritesStats(deleteUserVenueFavorite)
    },
    refetchQueries
  })

  const onAddFavorite = () =>
    addFavorite({
      variables: {
        venueId: venueId
      }
    })

  const onDeleteFavorite = () =>
    deleteFavorite({
      variables: {
        venueId: venueId
      }
    })

  return (
    <React.Fragment>
      {favoriteByCurrentUser ? (
        <span>
          &#9733;&nbsp;
          <button
            onClick={e => {
              e.preventDefault()
              onDeleteFavorite()
            }}
          >
            {' '}
            Unlike
          </button>
        </span>
      ) : (
        <button
          href="#"
          onClick={e => {
            e.preventDefault()
            onAddFavorite()
          }}
        >
          Like
        </button>
      )}
    </React.Fragment>
  )
}

export default FavoriteButton
