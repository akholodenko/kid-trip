import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { withApollo } from 'react-apollo'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { GET_VENUE_TYPES } from '../../graphql/venueQueries'

const style = {
  container: {
    position: 'relative',
    width: '350px',
    display: 'inline-block'
  },
  formControl: {
    minWidth: '500px',
    marginTop: '16px',
    marginBottom: '8px',
    height: '16px'
  }
}

const VenueTypeMultiFormField = ({
  client,
  initialValue,
  onVenueTypeSelected
}) => {
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

  useEffect(() => {
    if (options && options.length && initialValue) {
      const defaultVenueTypeIds = initialValue.split(',').map(venueTypeId => {
        return parseInt(venueTypeId)
      })

      setSelectedOption(
        options.filter(venueType =>
          defaultVenueTypeIds.includes(venueType.value)
        )
      )
    }
  }, [options, initialValue])

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
