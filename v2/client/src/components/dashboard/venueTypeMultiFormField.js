import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { withApollo } from 'react-apollo'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { GET_VENUE_TYPES } from '../../graphql/venueQueries'

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
    fontSize: '17px'
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

const VenueTypeMultiFormField = ({ client, onVenueTypeSelected }) => {
  const [selectedOption, setSelectedOption] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    client
      .query({
        query: GET_VENUE_TYPES
      })
      .then(({ data }) => {
        setOptions(
          data.venueTypes.map(venueType => {
            return { value: venueType.id, label: venueType.name }
          })
        )
      })
  }, [client])

  const handleOptionChange = option => {
    setSelectedOption(option)
    onVenueTypeSelected(option)
  }

  return (
    <div style={style.container}>
      <FormControl style={style.formControl}>
        <InputLabel shrink={true} htmlFor="age-simple">
          Venue type
        </InputLabel>
      </FormControl>
      <Select
        value={selectedOption}
        defaultValue={null}
        onChange={handleOptionChange}
        options={options}
        placeholder="Select venue type"
        isClearable={true}
        isMulti={true}
        isSearchable={false}
        escapeClearsValue={true}
      />
    </div>
  )
}

export default withApollo(VenueTypeMultiFormField)
