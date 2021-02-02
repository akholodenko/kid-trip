const dotenv = require('dotenv')

const result = dotenv.config({ path: 'config.env' })

if (result.error) {
  throw result.error
}

const { DB_SCHEMA, DB_USER, DB_PASSWORD, DB_HOST } = result.parsed

module.exports = {
  development: {
    username: DB_USER,
    password: null,
    database: DB_SCHEMA,
    host: DB_HOST,
    dialect: 'postgres',
    operatorsAliases: '0'
  },
  test: {
    username: DB_USER,
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_SCHEMA,
    host: DB_HOST,
    dialect: 'postgres',
    operatorsAliases: '0'
  }
}
