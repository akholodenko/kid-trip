import React from 'react'
import withPageTemplate from './shared/withPageTemplate'
import { isValueInObject } from '../utils/validationUtils'

const MESSAGE_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  SENT: 'sent',
  ARCHIVED: 'archived'
}

const MessagesPage = ({ match }) => {
  let status = isValueInObject(MESSAGE_STATUS, match.params.status)
    ? match.params.status
    : MESSAGE_STATUS.UNREAD

  return <div>{status}messages here</div>
}

export default withPageTemplate(MessagesPage)
