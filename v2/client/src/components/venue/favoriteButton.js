import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER_VENUE_FAVORITE_MUTATION } from '../../graphql/venueMutations'
import { GET_VENUE_ADVANCED } from '../../graphql/venueQueries'

export default ({ venueId }) => {
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

  const onClick = () =>
    addFavorite({
      variables: {
        venueId: venueId
      }
    })

  return (
    <React.Fragment>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
      >
        Like
      </a>
    </React.Fragment>
  )
}
