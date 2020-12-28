import { gql } from '@apollo/client'

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const UPDATE_CURRENT_USER_FEED_CONFIG_MUTATION = gql`
  mutation UpdateCurrentUserFeedConfigMutation(
    $cityIds: String
    $venueTypeIds: String
  ) {
    updateUserFeedConfig(cityIds: $cityIds, venueTypeIds: $venueTypeIds) {
      cityIds
      venueTypeIds
    }
  }
`

export const CREATE_USER_FOLLOWER_MUTATION = gql`
  mutation CreateUserFollower($publicId: String!) {
    createUserFollower(publicId: $publicId) {
      followedByCurrentUser
      followers
      followees
    }
  }
`

export const DELETE_USER_FOLLOWER_MUTATION = gql`
  mutation DeleteUserFollower($publicId: String!) {
    deleteUserFollower(publicId: $publicId) {
      followedByCurrentUser
      followers
      followees
    }
  }
`
