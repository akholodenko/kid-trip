import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import { pool } from './database'

pool.query("select * from venue_types", (ex, rows) => {
	if (ex) {
		console.log(ex);
	} else {
		console.log(rows);
	}
});

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    venueTypes: [VenueType]!
  }
  
  type VenueType {
  	id: Int!
  	name: String!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
	venueTypes: () => {
		return [{ id: 1, name: 'outdoor playground' },
			{ id: 2, name: 'amusement park' },
			{ id: 3, name: 'museum' },
			{ id: 4, name: 'sport' },
			{ id: 5, name: 'food' },
			{ id: 6, name: 'zoo' },
			{ id: 7, name: 'outdoor playground' },
			{ id: 8, name: 'indoor playground' },
			{ id: 9, name: 'hiking trail' }]
	}
};

const app = express();
app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');