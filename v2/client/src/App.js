import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Routes from './routes'
import { isHomepage } from './utils/routeUtils'

import HomePage from './components/homePage'
import DashboardPage from './components/dashboardPage'
import VenuePage from './components/venuePage'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import theme from './theme'
import AppBar from './layout/appBarContainer'
import SessionNotifications from './layout/sessionNotifications'
import UserProfilePage from './components/userProfilePage'
import MessagesPage from './components/messagesPage'
import { SessionNotificationProvider } from './providers/sessionNotificationProvider'

import './components/shared/inlineButton.css'

const styles = {
  '@global': {
    body: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
    },
    '.mainContainer': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.mainContent': {
      maxWidth: '1200px',
      flexGrow: '1',
      margin: '25px',
      backgroundColor: '#ffffff',
      padding: '25px',
      borderRadius: '8px',
    },
  },
  appBarSpacer: {
    height: '49px',
  },
}

class App extends Component {
  render() {
    const { classes, location } = this.props

    return (
      <SessionNotificationProvider>
        <MuiThemeProvider theme={theme}>
          <div>
            <CssBaseline />
            <AppBar />
            {!isHomepage(location) && (
              <div className={classes.appBarSpacer}></div>
            )}
            <Switch>
              <Route exact path={Routes.home} component={HomePage} />
              <Route path={Routes.dashboard} component={DashboardPage} />
              <Route path={Routes.venue} component={VenuePage} />
              <Route path={Routes.userProfile} component={UserProfilePage} />
              <Route path={Routes.messages} component={MessagesPage} />
            </Switch>
            <SessionNotifications></SessionNotifications>
          </div>
        </MuiThemeProvider>
      </SessionNotificationProvider>
    )
  }
}

export default withRouter(withStyles(styles)(App))
