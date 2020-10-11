import React, { useEffect, useState } from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_USER_PROFILE_BY_PUBLIC_ID } from '../graphql/userQueries'

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

  if (!publicId) {
    return <div>User profile not found.</div>
  } else {
    if (userProfile) {
      console.log(userProfile.config)
      return <div>{userProfile.user.firstName}</div>
    } else return false
  }
}

export default withPageTemplate(UserProfilePage)
