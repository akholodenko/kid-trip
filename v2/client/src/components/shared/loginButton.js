import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
// import { useQuery } from '@apollo/client'
import {
  isUserLoggedIn,
  withCurrentUser,
  listenForOpenSignUpDialog
} from '../../utils/userUtils'
import LoginDialog from './loginDialog'
import Typography from '@material-ui/core/Typography'
// import { CURRENT_USER_QUERY } from '../../graphql/userQueries'

const LoginButton = ({ currentUser, className }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [login, setLogin] = useState(true)

  useEffect(() => {
    listenForOpenSignUpDialog(() => {
      this.setState({ dialogOpen: true, login: false })
      setDialogOpen(true)
      setLogin(false)
    })
  })

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen)
    setLogin(true)
  }

  const renderUserInfo = currentUser => {
    if (currentUser && currentUser.id) {
      return `Welcome, ${currentUser.firstName}`
    } else {
      return ''
    }
  }

  // const { data } = useQuery(CURRENT_USER_QUERY)
  // console.log('data', data)

  return isUserLoggedIn() ? (
    <Typography variant="button" color="inherit" className={className}>
      {renderUserInfo(currentUser)}
    </Typography>
  ) : (
    <span>
      <Button onClick={toggleDialog} className={className} color="inherit">
        Login
      </Button>
      <LoginDialog
        open={dialogOpen}
        login={login}
        toggleDialog={toggleDialog}
      />
    </span>
  )
}

export default withCurrentUser(withRouter(LoginButton))
