import React from 'react'

import './valuePropSection.css'

const ValuePropSection = props => {
  const { title, icon, text } = props
  const iconStyle = {
    background: `url(/images/icons/${icon}.png) 0% 0% / 60px 60px no-repeat`,
    width: '60px',
    height: '60px'
  }

  return (
    <div className="value-prop-section">
      <div className="value-prop-title">{title}</div>
      <div className="value-prop-icon" style={iconStyle}></div>
      <div className="value-prop-text">{text}</div>
    </div>
  )
}

export default ValuePropSection
