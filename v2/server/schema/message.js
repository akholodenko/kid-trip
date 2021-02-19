import { gql } from 'apollo-server'

export default gql`
  type Message {
    id: Int!
    sender: User
    recipient: User!
    messageType: String
    body: String!
    status: String!
    createdAt: String!
  }

  type MessageCount {
    unread: Int
    read: Int
    archived: Int
    deleted: Int
  }

  type Conversationalist {
    id: Int!
    publicId: String!
    firstName: String!
    lastName: String
    createdAt: String!
  }
`
