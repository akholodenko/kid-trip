import StarRoundedIcon from '@material-ui/icons/StarRounded'
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded'
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded'
import { reviewStarColor } from '../../utils/styleUtils'

import React from 'react'

const ReviewStars = ({ rating }) => {
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
  } else if (ratingFloor < 5) {
    for (let x = 0; x < 5 - ratingFloor; x++) {
      html.push(
        <StarOutlineRoundedIcon
          key={Math.random()}
          style={{ color: reviewStarColor }}
        />
      )
    }
  }

  return html
}

export default ReviewStars
