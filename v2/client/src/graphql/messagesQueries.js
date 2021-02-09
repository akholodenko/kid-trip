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
