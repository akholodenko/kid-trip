import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import { CREATE_MESSAGE_MUTATION } from '../../graphql/messagesMutations'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1),
    marginRight: '0px',
    maxHeight: '36px'
  }
}))

const ComposeMessage = ({ conversationalistUserId, onMessageCreated }) => {
  const [message, setMessage] = useState()
  const classes = useStyles()

  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted: data => {
      setMessage('')
      onMessageCreated()
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
    )
  }

  return null
}

export default ComposeMessage
