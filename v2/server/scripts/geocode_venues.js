// const mysql = require('mysql2');
//
// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	database: 'kidtrip'
// });
//
// connection.query(
// 	'SELECT id, zips FROM cities',
// 	function(err, results, fields) {
// 		results.map((result) => {
// 			// console.log(result.id, result.zips.split(' '))
// 			result.zips.split(' ').map((zip) => {
// 				// console.log(result.id, zip)
// 				if(zip && zip.length) {
// 					connection.query('insert into cities_zipcodes (city_id, zipcode) values (?,?)', [result.id, zip])
// 				}
// 			})
// 		})
//
// 		console.log('done')
// 	}
// );

/* example running script in terminal: PGDATABASE=kidtrip node geocode_venues.js -limit 10 */

const axios = require('axios')
const { Client } = require('pg')
const client = new Client()

const MAP_QUEST_KEY = 'Fc2rmtc3qvUqLSXKGOU9dUuXgsoujhA9'

client.connect()


if (process.argv.length === 2) {
	console.error('Expected at least one argument!')
	process.exit(1)
} else {
	let limit = 1
	for (let x = 0; x < process.argv.length; x++) {
		if (process.argv[x] === '-limit') {
			limit = parseInt(process.argv[x + 1])
		}
	}

	console.log(`Limit: ${limit}`)


	client.query(`
		SELECT v.id, v.street_address, c.name as city, c.state, v.zipcode from venues v 
		JOIN cities c on c.id = v.city_id
		WHERE v.lat is null or v.lng is null 
		LIMIT $1::NUMERIC`, [limit], (err, res) => {
		if (res.rows.length) {
			let count = 0
			for (count; count < res.rows.length; count++) {
				const venue = res.rows[count]

				geocodeVenue(venue).then((locationInfo) => {
					console.log(venue, locationInfo)

					client.query(`
						UPDATE venues SET lat = ${locationInfo.lat}, lng = ${locationInfo.lng}
						WHERE id = $1::NUMERIC`,
						[venue.id]
					)
				})
			}
		} else {
			client.end()
		}
	})
}

async function geocodeVenue(venue) {
	let response = await axios(`http://open.mapquestapi.com/geocoding/v1/address?key=${MAP_QUEST_KEY}&location=${venue.street_address}, ${venue.city}, ${venue.state} ${venue.zipcode}`)

	if (response.data.results.length && response.data.results[0].locations.length) {
		return response.data.results[0].locations[0].latLng
	}

	return null
}