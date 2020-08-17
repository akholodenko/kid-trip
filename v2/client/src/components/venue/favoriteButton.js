import React from 'react'
import { useMutation } from '@apollo/client'
import {
  CREATE_USER_VENUE_FAVORITE_MUTATION,
  DELETE_USER_VENUE_FAVORITE_MUTATION
} from '../../graphql/venueMutations'
import {
  GET_VENUE_BY_SLUG,
  GET_VENUES_FOR_CURRENT_USER
} from '../../graphql/venueQueries'

export default ({
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

  const updateFavoriteStats = (store, venueStats) => {
    let data = store.readQuery({
      query: GET_VENUE_BY_SLUG,
      variables: { venueSlug }
    })

    onUpdateFavoritesStats(venueStats)

    store.writeQuery({
      query: GET_VENUE_BY_SLUG,
      variables: { venueSlug },
      data: {
        ...data,
        venueBySlug: { ...data.venueBySlug, venueStats: { ...venueStats } }
      }
    })
  }

  const [addFavorite] = useMutation(CREATE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    update: (store, { data: { createUserVenueFavorite } }) => {
      updateFavoriteStats(store, createUserVenueFavorite)
    },
    refetchQueries
  })

  const [deleteFavorite] = useMutation(DELETE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    update: (store, { data: { deleteUserVenueFavorite } }) => {
      updateFavoriteStats(store, deleteUserVenueFavorite)
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
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              onDeleteFavorite()
            }}
          >
            Unlike
          </a>
        </span>
      ) : (
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            onAddFavorite()
          }}
        >
          Like
        </a>
      )}
    </React.Fragment>
  )
}
