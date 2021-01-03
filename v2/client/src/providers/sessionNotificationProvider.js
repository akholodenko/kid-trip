import React, { createContext, useCallback, useState } from 'react'

export const SessionNotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  clearNotifications: () => {}
})

export const SessionNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const contextValue = {
    notifications: notifications,
    addNotification: useCallback(
      (message, type) =>
        setNotifications(notifications.concat({ message, type })),
      [notifications]
    ),
    clearNotifications: useCallback(() => setNotifications([]), [])
  }

  return (
    <SessionNotificationContext.Provider value={contextValue}>
      {children}
    </SessionNotificationContext.Provider>
  )
}
