import React from 'react'

import ValuePropSection from './valueProp/valuePropSection'
import './valueProp.css'

const discoverContent = {
  title: 'Discover',
  icon: 'discover',
  text: `Find out about great local places to visit with your family. From restaurants, to museums, 
	parks and playgrounds, make the most of your time!`
}

const trackContent = {
  title: 'Track',
  icon: 'track',
  text: `Had a great time sharing a meal with your family or enjoyed a hiking trail? Jot it down to build your 
	roster of go-to places for your future trips.`
}

const shareContent = {
  title: 'Share',
  icon: 'share',
  text: `Share your favorite places to visit with friends and family; hear about what others are 
	enjoying, for great new ideas.`
}

export default () => {
  return (
    <div className="value-prop-container">
      <ValuePropSection {...discoverContent} />
      <ValuePropSection {...trackContent} />
      <ValuePropSection {...shareContent} />
    </div>
  )
}
