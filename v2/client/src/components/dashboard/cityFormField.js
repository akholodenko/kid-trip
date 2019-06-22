import React, { useState, useEffect } from 'react'
import { GET_CITIES } from "../../graphql/cityQueries"
import { Query, withApollo } from "react-apollo"

const style = {
	container: {
		position: 'relative',
	},
	input: {
		border: '1px solid #ccc',
		outline: 'none',
		width: '300px',
		padding: '20px',
		fontSize: '17px',
	},
	suggestionsContainer: {
		position: 'absolute',
		width: '300px',
		top: 62,
		left: 0,
		border: '1px solid #efefef'
	},
	suggestionItem: {
		width: '100%',
		padding: '10px'
	}
}

const CityFormField = ({ client, onCitySelected }) => {
	const [query, setQuery] = useState('')
	const [suggestions, setSuggestions] = useState([])

	useEffect(
		() => {
			console.log('query: ', query)

			if (query && query.length >= 3) {
				getSuggestions(query).then(({ data }) => {
					setSuggestions(data.cities)
				})
			} else {
				setSuggestions([])
			}
		},
		[query],
	)

	const getSuggestions = (query) => {
		return client.query({
			query: GET_CITIES,
			variables: { limit: 10, query },
		})
	}

	const haveSuggestions = () => !!suggestions.length

	const handleChange = (e) => {
		setQuery(e.target.value)
	}

	const handleSelection = (city) => {
		setQuery(`${city.name}, ${city.state}`)
		onCitySelected(city)
	}

	return (
		<div style={style.container}>
			<input onChange={handleChange} value={query} style={style.input}/>
			{haveSuggestions() && (
				<div style={style.suggestionsContainer}>
					{suggestions.map(city => (
						<div key={city.id} style={style.suggestionItem} onClick={() => handleSelection(city)}>
							{`${city.name}, ${city.state}`}
						</div>),
					)}
				</div>
			)}

		</div>
	)
}

export default withApollo(CityFormField)