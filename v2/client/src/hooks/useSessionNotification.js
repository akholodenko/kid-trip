import { useContext } from 'react'
import { SessionNotificationContext } from '../providers/sessionNotificationProvider'

export const SessionNotificationType = {
  MESSAGE: 1,
  WARNING: 2,
  ERROR: 3
}

const useSessionNotification = () => {
  const { notifications, addNotification, clearNotifications } = useContext(
    SessionNotificationContext
  )

  return { notifications, addNotification, clearNotifications }
}

export default useSessionNotification
