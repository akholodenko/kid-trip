import React, { Fragment } from 'react'
import { useMutation } from '@apollo/client'
import { headerStyles } from '../../utils/styleUtils'
import { withCurrentUser } from '../../utils/userUtils'
import {
  CREATE_USER_FOLLOWER_MUTATION,
  DELETE_USER_FOLLOWER_MUTATION
} from '../../graphql/userMutations'
import {
  GET_FOLLOWERS_FOR_CURRENT_USER,
  GET_USER_PROFILE_BY_PUBLIC_ID
} from '../../graphql/userQueries'
import { Link as RouterLink } from 'react-router-dom'
import Routes from '../../routes'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import IconButton from '@material-ui/core/IconButton'

const UserProfileHeader = ({ userProfile, currentUser }) => {
  const refetchQueries = [
    {
      query: GET_USER_PROFILE_BY_PUBLIC_ID,
      variables: { publicId: userProfile.publicId }
    },
    {
      query: GET_FOLLOWERS_FOR_CURRENT_USER
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

  const renderMessageButton = () => {
    if (currentUser.id === userProfile.user.id) {
      return null
    } else if (userProfile.stats.followsCurrentUser) {
      console.log('you can message this user!')
      return (
        <span>
          &nbsp;&#183;
          <IconButton
            style={{ padding: '0px 5px 0px 6px' }}
            color="inherit"
            aria-label="Compose message"
            component={RouterLink}
            to={Routes.messagesPath(userProfile.user.id)}
          >
            <EmailOutlinedIcon />
          </IconButton>
        </span>
      )
    }

    return null
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
            {renderMessageButton()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withCurrentUser(UserProfileHeader)
