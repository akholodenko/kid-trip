import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import ReviewRow from './reviewRow'

import './reviews.css'

const Reviews = ({ reviews }) => {
  return (
    <React.Fragment>
      <Typography style={{ marginTop: '40px' }} variant="h6">
        Reviews
      </Typography>
      {reviews.length ? (
        reviews.map(review => <ReviewRow key={review.id} review={review} />)
      ) : (
        <span>Be the first to leave a review!</span>
      )}
      <div className="writeReviewContainer">
        <TextareaAutosize
          className="writeReviewTextarea"
          aria-label="Write your review..."
          rowsMin={3}
          rowsMax={10}
          placeholder="Write your review..."
        />
      </div>
    </React.Fragment>
  )
}

export default Reviews
