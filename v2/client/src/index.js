import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink
} from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { onError } from '@apollo/client/link/error'

import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import { getUserInfoFromStorage } from './utils/userUtils'
import { AUTH_TOKEN } from './constants'
import { CURRENT_USER_QUERY } from './graphql/userQueries'

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST

const token = localStorage.getItem(AUTH_TOKEN)
const httpLink = new HttpLink({
  uri: SERVER_HOST, // || 'http://localhost:4000',
  credentials: 'same-origin',
  // fetchOptions: {
  //   mode: 'cors'
  // },
  headers: {
    authorization: token ? `Bearer ${token}` : ''
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    httpLink
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          followees: {
            merge: false
          },
          favoriteVenues: {
            merge: false
          }
        }
      }
    }
  }),
  resolvers: {}
})

client.writeQuery({
  query: CURRENT_USER_QUERY,
  data: {
    currentUser: { ...getUserInfoFromStorage() }
  }
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
