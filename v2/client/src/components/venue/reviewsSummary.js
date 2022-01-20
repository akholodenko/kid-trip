import React from 'react'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded'
import pluralize from 'pluralize'
import { reviewStarColor } from '../../utils/styleUtils'
import Typography from '@material-ui/core/Typography'

const drawStars = rating => {
  const ratingFloor = Math.floor(rating)
  let html = []

  for (let x = 1; x <= ratingFloor; x++) {
    html.push(<StarRoundedIcon key={x} style={{ color: reviewStarColor }} />)
  }

  if (ratingFloor < rating) {
    html.push(
      <StarHalfRoundedIcon
        key={Math.random()}
        style={{ color: reviewStarColor }}
      />
    )
  }

  return html
}

const ReviewsSummary = ({ reviews }) => {
  return (
    <div style={{ color: reviewStarColor, textAlign: 'center' }}>
      {drawStars(reviews.rating)}
      <br />
      <Typography variant="h6">
        {reviews.count} {pluralize('review', reviews.count)} | write a review
      </Typography>
    </div>
  )
}

export default ReviewsSummary
