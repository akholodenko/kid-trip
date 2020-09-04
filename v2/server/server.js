import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'
import { getUserByToken } from './utils'

const mainSchema = makeExecutableSchema({
  typeDefs
})

const schema = mergeSchemas({
  schemas: [mainSchema],
  resolvers
})

const server = new ApolloServer({
  schema,
  // typeDefs,
  // resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    const user = getUserByToken(token)

    return { user }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
