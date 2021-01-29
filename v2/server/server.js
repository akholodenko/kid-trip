import { ApolloServer, gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'
import { getUserByToken } from './utils'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  // cors: {
  //   origin: 'localhost',
  //   credentials: true
  // },
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    const user = getUserByToken(token)

    return { user }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
