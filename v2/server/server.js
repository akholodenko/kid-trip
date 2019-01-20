import express from 'express'
import graphqlHTTP from 'express-graphql'
import Sequelize from 'sequelize'

import schema from './schema'

const sequelize = new Sequelize('kidtrip', 'root', null, {
	host: 'localhost',
	dialect: 'mysql'
});

const VenueType = sequelize.define('venue_types', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: Sequelize.STRING
}, {
	timestamps: false
});

const getVenueTypes = () => {
	return VenueType.findAll({
		attributes: ['id', 'name'],
		order: [['name', 'ASC']]
	}).then((venueTypes) => {
		let cleanVenues = venueTypes.map((venueType) => {
			return {
				id: venueType.id,
				name: venueType.name
			}
		})

		return cleanVenues
	})
}

// The root provides a resolver function for each API endpoint
const root = {
	venueTypes: () => {
		return getVenueTypes()
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