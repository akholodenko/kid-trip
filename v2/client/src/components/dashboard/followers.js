import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS_FOR_CURRENT_USER } from '../../graphql/userQueries'
import { shortName } from '../../utils/userUtils'

import './followers/followers.css'

const Followers = () => {
  const [followData, setFollowData] = useState(null)

  const { loading, error, data } = useQuery(GET_FOLLOWERS_FOR_CURRENT_USER)

  useEffect(() => {
    if (data) {
      setFollowData(data.me)
      console.log('data.me', data.me)
    }
  }, [data])

  if (!followData || !followData.stats) return null
  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <div>
      <div>
        <strong>Stats:</strong>
        &nbsp;Followers: {followData.stats.followers}&nbsp;| Followees:&nbsp;
        {followData.stats.followees}
      </div>
      <div className="followers-container">
        <div className="followers-list-container">
          <div>Followees</div>
          {followData.followees.map(followee => (
            <div key={followee.id}>{shortName(followee)}</div>
          ))}
        </div>
        <div className="followers-list-container">
          <div>Followers</div>
          {followData.followers.map(follower => (
            <div key={follower.id}>{shortName(follower)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Followers
