import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { GET_CITIES } from '../../graphql/cityQueries'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { useApolloClient } from '@apollo/client'

const style = {
  container: {
    position: 'relative',
    width: '500px'
  },
  formControl: {
    minWidth: '500px',
    marginTop: '16px',
    marginBottom: '8px',
    height: '16px'
  }
}

const CityFormField = ({
  onCitySelected,
  isMulti,
  fieldLabel,
  placeholder,
  containerWidth,
  containerDisplay,
  initialValue
}) => {
  const client = useApolloClient()
  const [query, setQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState(isMulti ? [] : {})
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getSuggestions = query => {
      return client.query({
        query: GET_CITIES,
        variables: { limit: 10, query }
      })
    }

    if (query && query.length >= 3) {
      getSuggestions(query).then(({ data }) => {
        setOptions(
          data.cities.map(city => {
            return { value: city.id, label: `${city.name}, ${city.state}` }
          })
        )
      })
    } else {
      setOptions([])
    }
  }, [query, client])

  useEffect(() => {
    if (initialValue && Array.isArray(initialValue) && initialValue.length) {
      setSelectedOption(
        initialValue.map(city => {
          return { value: city.id, label: `${city.name}, ${city.state}` }
        })
      )
    }
  }, [initialValue])

  const handleInputChange = text => {
    setQuery(text)
  }

  const handleOptionChange = option => {
    setSelectedOption(option)
    onCitySelected(option)
  }

  const hasOptions = () => options && options.length

  return (
    <div
      style={{
        ...style.container,
        width: containerWidth ? containerWidth : '500px',
        display: containerDisplay ? containerDisplay : 'block'
      }}
    >
      <FormControl style={style.formControl}>
        <InputLabel shrink={true} htmlFor="age-simple">
          {fieldLabel ? fieldLabel : 'City'}
        </InputLabel>
      </FormControl>
      <Select
        value={selectedOption}
        defaultValue={null}
        onChange={handleOptionChange}
        options={options}
        onInputChange={handleInputChange}
        placeholder={placeholder ? placeholder : 'Type in name of city'}
        isClearable={true}
        isMulti={!!isMulti}
        menuIsOpen={hasOptions()}
        escapeClearsValue={true}
      />
    </div>
  )
}

export default CityFormField
