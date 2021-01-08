import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS_FOR_CURRENT_USER } from '../../graphql/userQueries'

const Followers = () => {
  const [followData, setFollowData] = useState(null)

  const { loading, error, data } = useQuery(GET_FOLLOWERS_FOR_CURRENT_USER)

  useEffect(() => {
    if (data) {
      setFollowData(data.me)

      console.log('data.me', data.me)
    }
  }, [data])

  if (loading) return null
  if (error) return `Error! ${error}`

  return <div>followers here.</div>
}

export default Followers
