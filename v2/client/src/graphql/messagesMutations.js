import { gql } from '@apollo/client'

export const UPDATE_CONVERSATION_MUTATION = gql`
  mutation UpdateConversationMutation(
    $conversationalistUserId: Int!
    $status: String!
  ) {
    updateConversation(
      conversationalistUserId: $conversationalistUserId
      status: $status
    ) {
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

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage(
    $conversationalistUserId: Int!
    $messageType: String!
    $body: String!
  ) {
    createMessage(
      conversationalistUserId: $conversationalistUserId
      messageType: $messageType
      body: $body
    ) {
      id
      status
      messageType
    }
  }
`
