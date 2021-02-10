import { gql } from '@apollo/client'

export const GET_MESSAGE_COUNT = gql`
  query {
    messageCount {
      unread
      read
      archived
      deleted
    }
  }
`

export const GET_MESSAGES = gql`
  query($status: String) {
    messages(status: $status) {
      id
      body
      status
      messageType
      recipient {
        id
        firstName
        lastName
      }
      sender {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`
