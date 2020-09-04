import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import { GET_VENUE_TYPES } from '../../graphql/venueQueries'

const style = {
  formControl: {
    minWidth: '500px',
    marginTop: '16px',
    marginBottom: '8px'
  }
}

export default ({ onVenueTypeSelected }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { loading, error, data } = useQuery(GET_VENUE_TYPES)

  const handleOptionChange = option => {
    setSelectedOption(option)
    onVenueTypeSelected(option)
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <FormControl style={style.formControl}>
      <InputLabel htmlFor="age-simple">Venue Type</InputLabel>
      <Select
        value={selectedOption}
        onChange={event => handleOptionChange(event.target.value)}
        inputProps={{
          name: 'type',
          id: 'venue-type'
        }}
      >
        {data.venueTypes.map(venueType => (
          <MenuItem key={venueType.id} value={venueType.id}>
            {venueType.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
