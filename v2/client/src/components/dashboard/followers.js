import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_FOLLOWERS_FOR_CURRENT_USER } from '../../graphql/userQueries'
import { shortName } from '../../utils/userUtils'

import './followers/followers.css'
import Routes from '../../routes'
import { DELETE_USER_FOLLOWER_MUTATION } from '../../graphql/userMutations'

const Followers = () => {
  const [followData, setFollowData] = useState(null)

  const { loading, error, data } = useQuery(GET_FOLLOWERS_FOR_CURRENT_USER)

  useEffect(() => {
    if (data) {
      setFollowData(data.me)
    }
  }, [data])

  const refetchQueries = [
    {
      query: GET_FOLLOWERS_FOR_CURRENT_USER
    }
  ]

  const [deleteUserFollower] = useMutation(DELETE_USER_FOLLOWER_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    refetchQueries
  })

  const onUnfollowClick = publicId => {
    return deleteUserFollower({ variables: { publicId } })
  }

  if (!followData || !followData.stats) return null
  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <div>
      <div className="followers-container">
        <div className="followers-list-container">
          <div className="followers-list-header">
            Followees ({followData.stats.followees})
          </div>
          {followData.followees.map(followee => (
            <div key={followee.id} className="followers-list-item">
              <RouterLink to={Routes.userProfilePath(followee.id)}>
                {shortName(followee)}
              </RouterLink>
              <button
                onClick={() => onUnfollowClick(followee.publicId)}
                className="inlineButton"
              >
                Un-follow
              </button>
            </div>
          ))}
        </div>
        <div className="followers-list-container">
          <div className="followers-list-header">
            Followers ({followData.stats.followers})
          </div>
          {followData.followers.map(follower => (
            <div key={follower.id} className="followers-list-item">
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
