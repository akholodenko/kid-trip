import React, { Fragment, useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_USER_PROFILE_BY_PUBLIC_ID } from '../graphql/userQueries'
import { headerStyles } from '../utils/styleUtils'
import SideVenueWidget from './userProfile/sideVenueWidget'

import './userProfile/userProfile.css'

const UserProfilePage = ({ match }) => {
  const publicId = match.params.userId
  const [userProfile, setUserProfile] = useState(null)
  // const { loading, error, data } = useQuery(GET_USER_PROFILE_BY_PUBLIC_ID, {
  const { data } = useQuery(GET_USER_PROFILE_BY_PUBLIC_ID, {
    variables: { publicId }
  })

  useEffect(() => {
    if (data) {
      setUserProfile(data.userProfile)
    }
  }, [data])

  if (!publicId) {
    return <div>User profile not found.</div>
  } else {
    if (userProfile) {
      const headerStyle = headerStyles(
        userProfile.config.headerImageUrl,
        '300px'
      )

      return (
        <div>
          <div style={{ ...headerStyle.container, borderRadius: '8px' }}>
            <div className="headerUserInfo">
              <strong>
                {userProfile.user.firstName}
                {userProfile.user.lastName &&
                  userProfile.user.lastName.length && (
                    <Fragment>&nbsp;{userProfile.user.lastName[0]}</Fragment>
                  )}
                .
              </strong>
              &nbsp;&#183;&nbsp;<span>{userProfile.stats.created} added</span>
              &nbsp;&#183;&nbsp;<span>{userProfile.stats.favorited} liked</span>
            </div>
          </div>
          <div className="contentContainer">
            <div className="contentContainerMain">More to come...</div>
            <div className="contentContainerSide">
              {userProfile.recentAddedVenues &&
                userProfile.recentAddedVenues.length && (
                  <SideVenueWidget
                    title="Recently added"
                    venues={userProfile.recentAddedVenues}
                  />
                )}
              {userProfile.recentFavoriteVenues &&
                userProfile.recentFavoriteVenues.length && (
                  <SideVenueWidget
                    title="Recently liked"
                    venues={userProfile.recentFavoriteVenues}
                  />
                )}
            </div>
          </div>
        </div>
      )
    } else return false
  }
}

export default withPageTemplate(UserProfilePage)
