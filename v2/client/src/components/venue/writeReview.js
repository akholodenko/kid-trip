import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import CheckIcon from '@material-ui/icons/Check'
import Button from '@material-ui/core/Button'
import { CREATE_REVIEW_MUTATION } from '../../graphql/reviewMutations'
import { GET_VENUE_BY_SLUG } from '../../graphql/venueQueries'

const WriteReview = ({ venue }) => {
  const [reviewText, setReviewText] = useState('')

  const [createReview] = useMutation(CREATE_REVIEW_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted: (data) => {
      console.log(data)
      setReviewText('')
      // onMessageCreated()
    },
    refetchQueries: [
      {
        query: GET_VENUE_BY_SLUG,
        variables: { venueSlug: venue.slug },
      },
    ],
  })

  const onSubmitReview = () => {
    if (reviewText && reviewText.length > 10) {
      console.log('submit review', reviewText, venue.id)

      return createReview({
        variables: {
          rating: 4,
          venueId: venue.id,
          description: reviewText,
        },
      })
    } else {
      console.log('too short, must be longer than 10')
    }
  }

  return (
    <div className="writeReviewContainer">
      <TextareaAutosize
        className="writeReviewTextarea"
        aria-label="Write your review..."
        minRows={3}
        maxRows={10}
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        endIcon={<CheckIcon />}
        onClick={() => onSubmitReview()}
      >
        Submit
      </Button>
    </div>
  )
}

export default WriteReview
