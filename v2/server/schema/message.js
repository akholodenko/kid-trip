import { gql } from 'apollo-server'

export default gql`
  type Message {
    id: ID!
    sender: User
    recipient: User!
    messageType: String
    body: String!
    status: String!
    createdAt: String!
  }
`
