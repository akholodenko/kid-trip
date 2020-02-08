import dotenv from 'dotenv'
import Sequelize from "sequelize"

const result = dotenv.config({ path: 'config.env' })

if (result.error) {
	throw result.error
}

const { DB_SCHEMA, DB_USER, DB_PASSWORD, DB_HOST } = result.parsed

export default new Sequelize(DB_SCHEMA, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'postgres',
	operatorsAliases: false,
})