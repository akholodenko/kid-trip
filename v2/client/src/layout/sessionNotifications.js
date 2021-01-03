import React, { Fragment } from 'react'
import useSessionNotification from '../hooks/useSessionNotification'

import './sessionNotification.css'

const SessionNotifications = () => {
  const { clearNotifications, notifications } = useSessionNotification()

  if (!notifications || !notifications.length) return null

  return (
    <Fragment>
      {notifications.map((notification, index) => (
        <div key={index} className={`sessionNotification`}>
          <div
            className={`sessionNotificationContent sessionNotificationLevel-${notification.type}`}
          >
            {notification.message}

            <div
              onClick={() => clearNotifications()}
              className="closeSessionNotification"
            >
              &times;
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default SessionNotifications
