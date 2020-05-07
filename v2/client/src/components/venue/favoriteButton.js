import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  CREATE_USER_VENUE_FAVORITE_MUTATION,
  DELETE_USER_VENUE_FAVORITE_MUTATION
} from '../../graphql/venueMutations'
import {
  GET_VENUE_ADVANCED,
  // GET_VENUE_BY_SLUG,
  GET_VENUES_FOR_CURRENT_USER
} from '../../graphql/venueQueries'

export default ({ venueId, venueSlug, favoriteByCurrentUser }) => {
  const refetchQueries = [
    {
      query: GET_VENUE_ADVANCED,
      variables: { venueId: venueId }
    },
    {
      query: GET_VENUES_FOR_CURRENT_USER
    }
  ]

  const [addFavorite] = useMutation(CREATE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    // update: (store, { data: { createUserVenueFavorite } }) => {
    //   console.log('update', createUserVenueFavorite)
    //   let data = store.readQuery({
    //     query: GET_VENUE_BY_SLUG,
    //     variables: { venueSlug }
    //   })
    //
    //   data.venueBySlug.venueStats = createUserVenueFavorite
    //   console.log(data.venueBySlug)
    //
    //   store.writeQuery({
    //     query: GET_VENUE_BY_SLUG,
    //     variables: { venueSlug },
    //     data
    //   })
    // },
    // onCompleted(data) {
    //   console.log('data', data)
    // },
    refetchQueries
  })

  const [deleteFavorite] = useMutation(DELETE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    // onCompleted(data) {
    //   console.log('data', data)
    // },
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
