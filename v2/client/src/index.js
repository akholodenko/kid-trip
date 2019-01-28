import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo'
import gql from "graphql-tag"

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto';

const client = new ApolloClient({
	uri: 'http://localhost:4000',
})

client
.query({
	query: gql`
        {
            venue(id:3) {
                id
                name
                streetAddress
                lat
                lng
                venueTypes {
                    id
                    name
                }
            }
        }
	`,
})
.then(result => console.log(result))

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
