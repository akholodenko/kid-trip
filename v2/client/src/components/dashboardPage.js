import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Add } from '@material-ui/icons'
import Routes from '../routes'

import AddVenueDialog from './dashboard/addVenueDialog'
import VenueList from './dashboard/venueList'

const DASHBOARD_SECTION = {
  FEED: 'feed',
  FOLLOWED_DESTINATIONS: 'followed-destinations',
  MY_DESTINATIONS: 'my-destinations',
  FAVORITES: 'favorites'
}

const styles = {
  '@global': {
    '.sectionHeader': {
      marginBottom: '30px',
      display: 'flex'
    },
    '.sectionHeaderTitle': {
      flexGrow: 2,
      maxWidth: '250px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: '0em',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#666',
      textAlign: 'center',
      textTransform: 'uppercase',
      borderRadius: '8px',
      margin: '0px 10px',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 2.5,
      border: '1px solid #eee'
    },
    '.sectionHeaderTitleSelected': {
      backgroundColor: '#f9f8f8'
    },
    '.venueList': {
      marginLeft: '320px'
    }
  }
}

const DashboardPage = ({ match }) => {
  const currentDashboardSection = Routes.validatePageSection(
    match.params.section,
    DASHBOARD_SECTION,
    DASHBOARD_SECTION.MY_DESTINATIONS
  )

  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen)
  }

  const renderDashboardSection = (text, dashboardSection) => {
    return (
      <RouterLink
        to={Routes.dashboardPath(dashboardSection)}
        className={`sectionHeaderTitle ${
          currentDashboardSection === dashboardSection
            ? 'sectionHeaderTitleSelected'
            : ''
        }`}
      >
        {text}
      </RouterLink>
    )
  }

  return (
    <div className="mainContainer">
      <div className="mainContent">
        <div className="sectionHeader">
          {renderDashboardSection('Feed', DASHBOARD_SECTION.FEED)}
          {renderDashboardSection(
            'My destinations',
            DASHBOARD_SECTION.MY_DESTINATIONS
          )}
          {renderDashboardSection(
            'Favorite destinations',
            DASHBOARD_SECTION.FAVORITES
          )}
          <Button
            variant="outlined"
            style={{ marginLeft: 'auto' }}
            onClick={toggleDialog}
          >
            <Add />
            Add Destination
          </Button>
          <AddVenueDialog open={dialogOpen} toggleDialog={toggleDialog} />
        </div>
        {currentDashboardSection === DASHBOARD_SECTION.FEED ? (
          <div>feed here</div>
        ) : (
          <VenueList
            currentDashboardSection={currentDashboardSection}
            isFavoritesDashboardSection={
              currentDashboardSection === DASHBOARD_SECTION.FAVORITES
            }
          ></VenueList>
        )}
      </div>
    </div>
  )
}

export default withStyles(styles)(DashboardPage)
