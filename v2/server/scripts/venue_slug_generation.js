const slugify = require('slugify')
const mysql = require('mysql2')

const venueNameSlug = name => slugify(name, {
	lower: true,
	remove: /[*+~.()'"!:@#^&]/g,
})

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'kidtrip',
})

const getAllSimilarVenues = (slug, callback) => {
	connection.query(`SELECT slug from VENUES where slug like '${slug}%'`, (err, results, fields) => {
		callback(results)
	})
}

connection.query(
		`SELECT id, name, zipcode from VENUES where slug is null OR slug = ''`,
	function (err, results) {
		results.map((result) => {
			let slug = venueNameSlug(result.name)
			console.log(result.id, result.name, slug)

			getAllSimilarVenues(slug, (similarVenues) => {
				const existingSlugs = similarVenues.map((venue) => {
					return venue.slug
				})

				if (existingSlugs.length) {
					if (existingSlugs.includes(`${slug}-${result.zipcode}`)) {
						let counter = 1
						while (existingSlugs.includes(`${slug}-${counter}`)) {
							counter++
						}

						slug = `${slug}-${counter}`
					} else {
						slug = `${slug}-${result.zipcode}`
					}
				}

				connection.query('UPDATE venues SET slug = ? where id = ?', [slug, result.id])
			})
		})
		console.log('done')
	},
)