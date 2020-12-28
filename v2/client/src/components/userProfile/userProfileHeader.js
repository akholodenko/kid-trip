import React, { Fragment } from 'react'
import { headerStyles } from '../../utils/styleUtils'
import { withCurrentUser } from '../../utils/userUtils'

const UserProfileHeader = ({ userProfile, currentUser }) => {
  const headerStyle = headerStyles(userProfile.config.headerImageUrl, '300px')

  const onFollowClick = () => {
    console.log('follow user!')
  }

  const onUnfollowClick = () => {
    console.log('unfollow user')
  }

  const renderFollowButton = () => {
    if (currentUser.id === userProfile.user.id) {
      return 'Your Profile'
    } else if (userProfile.stats.followedByCurrentUser) {
      return (
        <button onClick={() => onUnfollowClick()} className="headerUserButton">
          Un-follow
        </button>
      )
    } else {
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
