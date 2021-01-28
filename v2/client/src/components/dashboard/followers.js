import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS_FOR_CURRENT_USER } from '../../graphql/userQueries'
import { shortName } from '../../utils/userUtils'

import './followers/followers.css'
import Routes from '../../routes'

const Followers = () => {
  const [followData, setFollowData] = useState(null)

  const { loading, error, data } = useQuery(GET_FOLLOWERS_FOR_CURRENT_USER, {
    fetchPolicy: 'no-cache'
  })

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
      <div className="followers-container">
        <div className="followers-list-container">
          <div className="follower-list-header">
            Followees ({followData.stats.followees})
          </div>
          {followData.followees.map(followee => (
            <div key={followee.id}>
              <RouterLink to={Routes.userProfilePath(followee.id)}>
                {shortName(followee)}
              </RouterLink>
            </div>
          ))}
        </div>
        <div className="followers-list-container">
          <div className="follower-list-header">
            Followers ({followData.stats.followers})
          </div>
          {followData.followers.map(follower => (
            <div key={follower.id}>
              <RouterLink to={Routes.userProfilePath(follower.id)}>
                {shortName(follower)}
              </RouterLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Followers
