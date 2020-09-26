import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { decodeUserId } from '../utils/routeUtils'

const UserProfilePage = ({ match }) => {
  const userId = decodeUserId(match.params.userId)

  return <div>user ({userId}) profile here</div>
}

export default withPageTemplate(UserProfilePage)
