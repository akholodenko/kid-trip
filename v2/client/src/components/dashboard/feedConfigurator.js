import React, { useState } from 'react'
import CityFormField from './cityFormField'
import VenueTypeMultiFormField from './venueTypeMultiFormField'

const FeedConfigurator = ({ onFeedConfigurationUpdated }) => {
  const [cityIds, setCityIds] = useState()
  const [venueTypeIds, setVenueTypeIds] = useState()

  const onCitySelected = cities => {
    const ids = cities ? cities.map(city => city.value).join(',') : null
    setCityIds(ids)
    onFeedConfigurationUpdated({ cityIds: ids, venueTypeIds })
  }

  const onVenueTypeSelected = venueTypes => {
    const ids = venueTypes
      ? venueTypes.map(venueType => venueType.value).join(',')
      : null
    setVenueTypeIds(ids)
    onFeedConfigurationUpdated({ venueTypeIds: ids, cityIds })
  }

  return (
    <div>
      <CityFormField
        onCitySelected={onCitySelected}
        fieldLabel="Filter feed by city"
        placeholder="e.g.: San Francisco, CA"
        isMulti={true}
      ></CityFormField>
      <VenueTypeMultiFormField
        onVenueTypeSelected={onVenueTypeSelected}
      ></VenueTypeMultiFormField>
    </div>
  )
}

export default FeedConfigurator
