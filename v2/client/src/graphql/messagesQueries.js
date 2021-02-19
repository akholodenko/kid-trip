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

export const GET_CONVERSATIONALISTS = gql`
  query {
    conversationalists {
      id
      publicId
      firstName
      lastName
      createdAt
    }
  }
`

export const GET_CONVERSATION = gql`
  query($conversationalistUserId: Int!) {
    conversation(conversationalistUserId: $conversationalistUserId) {
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
