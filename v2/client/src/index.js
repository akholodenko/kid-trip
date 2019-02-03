import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from "apollo-link-state"

import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import { getUserInfo } from "./utils/userUtils"

const cache = new InMemoryCache()

const defaultState = {
	currentUser: { ...getUserInfo() },
}

const stateLink = withClientState({
	cache,
	defaults: defaultState,
	resolvers: {
		Mutation: {
			updateUserInfo: (_, { id, firstName, lastName, email }, { cache }) => {
				const data = {
					user: {
						__typename: 'User',
						id,
						firstName,
						lastName,
						email,
					},
				}
				cache.writeData({ data })
				return null
			},
		},
	},
})

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
					),
				)
			if (networkError) console.log(`[Network error]: ${networkError}`)
		}),
		stateLink,
		new HttpLink({
			uri: 'http://localhost:4000',
			credentials: 'same-origin',
		}),
	]),
	cache: new InMemoryCache(),
})

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App/>
		</ApolloProvider>
	</BrowserRouter>
	, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
