import React, { Fragment } from 'react'
import { useMutation } from '@apollo/client'
import { headerStyles } from '../../utils/styleUtils'
import { withCurrentUser } from '../../utils/userUtils'
import {
  CREATE_USER_FOLLOWER_MUTATION,
  DELETE_USER_FOLLOWER_MUTATION
} from '../../graphql/userMutations'
import { GET_USER_PROFILE_BY_PUBLIC_ID } from '../../graphql/userQueries'

const UserProfileHeader = ({ userProfile, currentUser }) => {
  const refetchQueries = [
    {
      query: GET_USER_PROFILE_BY_PUBLIC_ID,
      variables: { publicId: userProfile.publicId }
    }
  ]

  const [
    createUserFollower,
    { loading: createUserFollowerLoading }
  ] = useMutation(CREATE_USER_FOLLOWER_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    refetchQueries
  })

  const [
    deleteUserFollower,
    { loading: deleteUserFollowerLoading }
  ] = useMutation(DELETE_USER_FOLLOWER_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    refetchQueries
  })

  const headerStyle = headerStyles(userProfile.config.headerImageUrl, '300px')

  const onFollowClick = () => {
    return createUserFollower({ variables: { publicId: userProfile.publicId } })
  }

  const onUnfollowClick = () => {
    return deleteUserFollower({ variables: { publicId: userProfile.publicId } })
  }

  const renderFollowButton = () => {
    if (currentUser.id === userProfile.user.id) {
      return 'Your Profile'
    } else if (userProfile.stats.followedByCurrentUser) {
      if (deleteUserFollowerLoading) {
        return <span>Loading...</span>
      }

      return (
        <button onClick={() => onUnfollowClick()} className="headerUserButton">
          Un-follow
        </button>
      )
    } else {
      if (createUserFollowerLoading) {
        return <span>Loading...</span>
      }
      return (
        <button onClick={() => onFollowClick()} className="headerUserButton">
          Follow
        </button>
      )
    }
  }

  return (
    <div style={{ ...headerStyle.container, borderRadius: '8px' }}>
      <div className="headerUserInfo">
        <div className="headerUserInfoName">
          {userProfile.user.firstName}
          {userProfile.user.lastName && userProfile.user.lastName.length && (
            <Fragment>&nbsp;{userProfile.user.lastName[0]}</Fragment>
          )}
          .
        </div>
        <div className="headerUserInfoStats">
          <div>
            <span>{userProfile.stats.created} places added</span>
            &nbsp;&#183;&nbsp;
            <span>{userProfile.stats.favorited} places liked</span>
          </div>
          <div>
            <span>{userProfile.stats.followees} following</span>
            &nbsp;&#183;&nbsp;
            <span>{userProfile.stats.followers} followers</span>
            &nbsp;&#183;&nbsp;
            {renderFollowButton()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withCurrentUser(UserProfileHeader)
