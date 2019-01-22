const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'kidtrip'
});

connection.query(
	'SELECT id, zips FROM cities',
	function(err, results, fields) {
		results.map((result) => {
			// console.log(result.id, result.zips.split(' '))
			result.zips.split(' ').map((zip) => {
				// console.log(result.id, zip)
				if(zip && zip.length) {
					connection.query('insert into cities_zipcodes (city_id, zipcode) values (?,?)', [result.id, zip])
				}
			})
		})

		console.log('done')
	}
);