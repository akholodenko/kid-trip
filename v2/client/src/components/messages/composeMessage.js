import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import { CREATE_MESSAGE_MUTATION } from '../../graphql/messagesMutations'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    paddingRight: '12px'
  },
  button: {
    margin: theme.spacing(1),
    maxHeight: '36px'
  }
}))

const ComposeMessage = ({ conversationalistUserId }) => {
  const [message, setMessage] = useState()
  const classes = useStyles()

  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted: data => {
      console.log('sent!!! - refresh convo!')
    }
  })

  const onSendMessage = () => {
    if (message && message.length > 2) {
      return createMessage({
        variables: {
          conversationalistUserId,
          messageType: 'direct',
          body: message
        }
      })
    }
  }

  if (conversationalistUserId) {
    return (
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <div className={classes.main}>
          <TextField
            id="standard-multiline-flexible"
            label="Type message"
            multiline
            rowsMax={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SendIcon />}
            onClick={() => onSendMessage()}
          >
            Send
          </Button>
        </div>
      </div>
    )
  }

  return null
}

export default ComposeMessage
