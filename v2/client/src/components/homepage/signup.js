import React from 'react'
import { isUserLoggedIn, openSignUpDialog } from '../../utils/userUtils'

import '../shared/button.css'
import './signup.css'

export default () => {
  const renderSignUp = () => {
    return (
      <div>
        <button
          className="form-button homepage-signup-button"
          onClick={() => openSignUpDialog()}
        >
          Get Started
        </button>
      </div>
    )
  }

  return <div>{isUserLoggedIn() ? 'yes' : renderSignUp()}</div>
}
