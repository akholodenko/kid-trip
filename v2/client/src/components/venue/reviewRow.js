import React from 'react'
import { shortName } from '../../utils/userUtils'
import { sinceCreated } from '../../utils/dateUtils'
import ReviewStars from '../shared/reviewStars'

import './reviewRow.css'
import Routes from '../../routes'
import { Link as RouterLink } from 'react-router-dom'

const ReviewRow = ({ review }) => {
  return (
    <div className="reviewRow">
      <div className="reviewRowHeader">
        <ReviewStars rating={review.rating}/>
        &nbsp;by&nbsp;
        <RouterLink to={Routes.userProfilePath(review.reviewer.id)}>
          {shortName(review.reviewer)}
        </RouterLink>
        &nbsp;
        {sinceCreated(review.updatedAt)}
      </div>
      <div className="reviewRowBody">{review.description}</div>
    </div>
  )
}

export default ReviewRow
