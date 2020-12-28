import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_USER_PROFILE_BY_PUBLIC_ID } from '../graphql/userQueries'
import SideVenueWidget from './userProfile/sideVenueWidget'

import './userProfile/userProfile.css'
import UserProfileHeader from './userProfile/userProfileHeader'

const UserProfilePage = ({ match }) => {
  const publicId = match.params.userId
  const [userProfile, setUserProfile] = useState(null)
  const { loading, error, data } = useQuery(GET_USER_PROFILE_BY_PUBLIC_ID, {
    variables: { publicId }
  })

  useEffect(() => {
    if (data) {
      setUserProfile(data.userProfile)
    }
  }, [data])

  if (loading) return null
  if (error) return `Error! ${error}`

  if (!publicId) {
    return <div>User profile not found.</div>
  } else {
    if (userProfile) {
      return (
        <div>
          <UserProfileHeader userProfile={userProfile}></UserProfileHeader>
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
