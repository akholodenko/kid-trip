import React from 'react'
import Typography from '@material-ui/core/Typography'
import ReviewRow from './reviewRow'
import WriteReview from './writeReview'

import './reviews.css'

const Reviews = ({ reviews, venue }) => {
  return (
    <React.Fragment>
      <Typography style={{ marginTop: '40px' }} variant="h6">
        Reviews
      </Typography>
      {reviews.length ? (
        reviews.map((review) => <ReviewRow key={review.id} review={review} />)
      ) : (
        <span>Be the first to leave a review!</span>
      )}
      <WriteReview venue={venue} />
    </React.Fragment>
  )
}

export default Reviews
