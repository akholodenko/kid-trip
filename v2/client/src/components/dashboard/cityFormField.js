import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { GET_CITIES } from "../../graphql/cityQueries"
import { withApollo } from "react-apollo"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"

const style = {
	container: {
		position: 'relative',
		width: '500px'
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
	},
	formControl: {
		minWidth: '500px',
		marginTop: '16px',
		marginBottom: '8px',
		height: '16px'
	}
}

const CityFormField = ({ client, onCitySelected }) => {
	const [query, setQuery] = useState('')
	const [selectedOption, setSelectedOption] = useState({})
	const [options, setOptions] = useState([])

	useEffect(
		() => {
			const getSuggestions = (query) => {
				return client.query({
					query: GET_CITIES,
					variables: { limit: 10, query },
				})
			}

			if (query && query.length >= 3) {
				getSuggestions(query).then(({ data }) => {
					setOptions(data.cities.map(city => {
						return {value: city.id, label: `${city.name}, ${city.state}`}
					}))
				})
			} else {
				setOptions([])
			}
		},
		[query, client],
	)

	const handleInputChange = (text) => {
		setQuery(text)
	}

	const handleOptionChange = option => {
		setSelectedOption(option)
		onCitySelected(option)
	}

	const hasOptions = () => options && options.length

	return (
		<div style={style.container}>
			<FormControl style={style.formControl}>
				<InputLabel shrink={true}
										htmlFor="age-simple">City</InputLabel>
			</FormControl>
			<Select
				value={selectedOption}
				onChange={handleOptionChange}
				options={options}
				onInputChange={handleInputChange}
				placeholder="Type in name of city"
				isClearable={true}
				menuIsOpen={hasOptions()}
				escapeClearsValue={true}
			/>

		</div>
	)
}

export default withApollo(CityFormField)