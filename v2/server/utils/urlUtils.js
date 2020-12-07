import dotenv from 'dotenv'
const result = dotenv.config({ path: 'config.env' })

if (result.error) {
  throw result.error
}

const { S3_URL } = result.parsed

export { S3_URL }
