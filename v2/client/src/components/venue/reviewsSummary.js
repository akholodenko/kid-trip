import React from 'react'
import pluralize from 'pluralize'
import Typography from '@material-ui/core/Typography'
import ReviewStars from '../shared/reviewStars'

const ReviewsSummary = ({ reviews }) => {
  return (
    <div style={{ color: '#ccc', textAlign: 'center' }}>
      <ReviewStars rating={reviews.rating} />
      <Typography variant="h6">
        {reviews.count} {pluralize('review', reviews.count)} | write a review
      </Typography>
    </div>
  )
}

export default ReviewsSummary
