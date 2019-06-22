import gql from "graphql-tag"

export const GET_CITIES = gql`
	query ($limit: Int, $query: String) {
		cities(first: $limit, query: $query) {
			id
			name
			state
		}
	}
`