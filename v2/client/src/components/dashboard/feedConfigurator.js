import React from 'react'
import CityFormField from './cityFormField'

const FeedConfigurator = ({ onFeedConfigurationUpdated }) => {
  const onCitySelected = cities => {
    onFeedConfigurationUpdated({ cities })
  }

  return (
    <div>
      <CityFormField
        onCitySelected={onCitySelected}
        fieldLabel="Filter feed by city"
        placeholder="e.g.: San Francisco, CA"
        isMulti={true}
      ></CityFormField>
    </div>
  )
}

export default FeedConfigurator
