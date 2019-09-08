const slugify = require('slugify')
const mysql = require('mysql2');

const venueNameSlug = name => slugify(name, {
	lower: true,
	remove: /[*+~.()'"!:@#^&]/g,
})

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'kidtrip'
});

connection.query(
	`SELECT id, name from VENUES`,
	function(err, results, fields) {
		results.map((result) => {
			console.log(result.id, result.name, venueNameSlug(result.name))

			connection.query('UPDATE venues SET slug = ? where id = ?', [venueNameSlug(result.name), result.id])
		})
		console.log('done')
		process.exit()
	}
);