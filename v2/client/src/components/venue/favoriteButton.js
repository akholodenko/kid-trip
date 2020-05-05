import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  CREATE_USER_VENUE_FAVORITE_MUTATION,
  DELETE_USER_VENUE_FAVORITE_MUTATION
} from '../../graphql/venueMutations'
import { GET_VENUE_ADVANCED } from '../../graphql/venueQueries'

export default ({ venueId, favoriteByCurrentUser }) => {
  const [addFavorite] = useMutation(CREATE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted(data) {
      console.log('data', data)
    },
    refetchQueries: [
      {
        query: GET_VENUE_ADVANCED,
        variables: { venueId: venueId }
      }
    ]
  })

  const [deleteFavorite] = useMutation(DELETE_USER_VENUE_FAVORITE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted(data) {
      console.log('data', data)
    },
    refetchQueries: [
      {
        query: GET_VENUE_ADVANCED,
        variables: { venueId: venueId }
      }
    ]
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
