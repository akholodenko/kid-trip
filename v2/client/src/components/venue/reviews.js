import React from 'react'
import Typography from '@material-ui/core/Typography'
import ReviewRow from './reviewRow'

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
    </React.Fragment>
  )
}

export default Reviews
