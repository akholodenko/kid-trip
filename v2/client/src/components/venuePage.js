import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import NumberFormat from 'react-number-format'
import pluralize from 'pluralize'
import { GET_VENUE_BY_SLUG } from '../graphql/venueQueries'

import VenueHeader from './venue/header'
import SimilarVenues from './venue/similarVenues'
import { venuePrimaryTypeName } from '../utils/venueUtils'
import { isUserLoggedIn, shortName } from '../utils/userUtils'
import { sinceCreated } from '../utils/dateUtils'
import LocationInfo from './venue/locationInfo'
import FavoriteButton from './venue/favoriteButton'
import Typography from '@material-ui/core/Typography'

const pageStyle = {
  sectionHeader: {
    marginBottom: '15px'
  },
  columnWrapper: {
    display: 'flex'
  },
  mainColumn: {
    flexGrow: 3,
    maxWidth: '800px'
  },
  sideColumm: {
    flexGrow: 1,
    marginTop: '-20px'
  }
}

const VenuePage = ({ match }) => {
  const venueSlug = match.params.venueSlug
  const [venue, setVenue] = useState(null)
  const [venueTypeName, setVenueTypeName] = useState('')

  const { loading, error, data } = useQuery(GET_VENUE_BY_SLUG, {
    variables: { venueSlug }
  })

  useEffect(() => {
    if (data) {
      setVenue(data.venueBySlug)
      setVenueTypeName(venuePrimaryTypeName(data.venueBySlug))
    }
  }, [data])

  const onUpdateFavoritesStats = venueStats => {
    setVenue({ ...venue, venueStats: { ...venueStats } })
  }

  if (loading) return null
  if (error) return `Error! ${error}`

  if (!venueSlug) {
    return <div>Venue not found.</div>
  } else {
    return (
      venue && (
        <div>
          <VenueHeader venue={venue} />
          <div className="mainContainer">
            <div className="mainContent">
              <div style={pageStyle.columnWrapper}>
                <div style={pageStyle.mainColumn}>
                  <div>
                    Liked by{' '}
                    <strong>
                      <NumberFormat
                        value={venue.venueStats.favorites}
                        thousandSeparator={true}
                        displayType={'text'}
                      />{' '}
                      {pluralize('person', venue.venueStats.favorites)}
                    </strong>
                    . &nbsp;
                    {isUserLoggedIn() && (
                      <FavoriteButton
                        venueId={venue.id}
                        venueSlug={venueSlug}
                        favoriteByCurrentUser={
                          venue.venueStats.favoriteByCurrentUser
                        }
                        onUpdateFavoritesStats={onUpdateFavoritesStats}
                      />
                    )}
                  </div>
                  <br />
                  {venue.description && <span>{venue.description}</span>}
                  This {venueTypeName} is located in {venue.city}, {venue.state}
                  .<Typography variant="h6">Reviews</Typography>
                  {venue.reviews.map(review => (
                    <div>
                      <div>
                        {review.rating} by {shortName(review.reviewer)}{' '}
                        {sinceCreated(review.updatedAt)}
                      </div>
                      <div>{review.description}</div>
                    </div>
                  ))}
                </div>
                <div style={pageStyle.sideColumm}>
                  <LocationInfo venue={venue} />
                  <SimilarVenues venue={venue} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default VenuePage
