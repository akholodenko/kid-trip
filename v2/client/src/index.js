import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
	// uri: "https://48p1r2roz4.sse.codesandbox.io",
	uri: 'http://localhost:4000',
})

client
.query({
	query: gql`
        {
#            rates(currency: "USD") {
#                currency
#            }
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

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
