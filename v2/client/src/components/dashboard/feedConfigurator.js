import React, { useState, useEffect } from 'react'
import CityFormField from './cityFormField'
import VenueTypeMultiFormField from './venueTypeMultiFormField'

const FeedConfigurator = ({
  feedConfiguration,
  onFeedConfigurationUpdated
}) => {
  const [cityIds, setCityIds] = useState()
  const [venueTypeIds, setVenueTypeIds] = useState()

  useEffect(() => {
    setCityIds(feedConfiguration.cityIds)
    setVenueTypeIds(feedConfiguration.venueTypeIds)
  }, [feedConfiguration])

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
        containerWidth="350px"
        containerDisplay="inline-block"
        initialValue={feedConfiguration.cityDetails}
      ></CityFormField>
      <div
        style={{ display: 'inline-block', width: '30px', height: '20px' }}
      ></div>
      <VenueTypeMultiFormField
        initialValue={venueTypeIds}
        onVenueTypeSelected={onVenueTypeSelected}
      ></VenueTypeMultiFormField>
    </div>
  )
}

export default FeedConfigurator
