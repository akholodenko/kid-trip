import React, { useEffect, useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import NumberFormat from 'react-number-format'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import CityFormField from './cityFormField'
import VenueTypeFormField from './venueTypeFormField'
import { CREATE_VENUE_MUTATION } from '../../graphql/venueMutations'
import Button from '@material-ui/core/Button'

import { validateVenue } from '../../utils/validationUtils'
import { venuePrimaryTypeName, venueCityState } from '../../utils/venueUtils'

import { useMutation, useLazyQuery } from '@apollo/client'
import {
  GET_VENUES_FOR_CURRENT_USER,
  GET_SIMILAR_VENUES_BY_NAME
} from '../../graphql/venueQueries'

const USER_ACTION_TEXT = 'Please enter information about a place you enjoyed.'
const USER_ACTION_TEXT_ERROR = 'Please enter valid venue information'

const style = {
  appBar: {
    position: 'relative'
  },
  title: {
    margin: '0 auto'
  },
  body: {
    margin: '0 auto'
  },
  input: {
    minWidth: '500px'
  }
}

const venueStub = {
  name: '',
  type: {
    id: null
  },
  streetAddress: '',
  zipcode: '',
  lat: '',
  lng: '',
  city: {}
}

const AddVenueDialog = ({ open, toggleDialog, onCreatedVenue }) => {
  const [addVenue] = useMutation(CREATE_VENUE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted(data) {
      onCreatedVenue()
    },
    refetchQueries: [
      {
        query: GET_VENUES_FOR_CURRENT_USER
      }
    ],
    awaitRefetchQueries: true
  })

  const [getSimilarVenuesByName, similarVenuesByNameResults] = useLazyQuery(
    GET_SIMILAR_VENUES_BY_NAME
  )

  useEffect(() => {
    if (similarVenuesByNameResults.data) {
      console.log(
        'similar',
        similarVenuesByNameResults.data.similarVenuesByName
      )
      setSimilarVenues(similarVenuesByNameResults.data.similarVenuesByName)
    }
  }, [similarVenuesByNameResults.data])

  const [newVenue, setNewVenue] = useState({ ...venueStub })
  const [userActionText, setUserActionText] = useState(USER_ACTION_TEXT)
  const [similarVenues, setSimilarVenues] = useState(null)

  const onCitySelected = city => {
    if (city && city.value) {
      setNewVenue({ ...newVenue, city: { id: city.value } })

      getSimilarVenuesByName({
        variables: { name: newVenue.name, cityId: city.value, limit: 5 }
      })
    } else {
      setNewVenue({ ...newVenue, city: {} })
    }
  }

  const onVenueTypeSelected = venueTypeId => {
    setNewVenue({ ...newVenue, type: { id: venueTypeId } })
  }

  const handleChange = name => event => {
    const value = event.target.value
    setNewVenue({ ...newVenue, [name]: value })

    if (name === 'name' && value && value.length >= 3) {
      getSimilarVenuesByName({
        variables: { name: value, cityId: newVenue.city.id, limit: 5 }
      })
    }
  }

  const onSubmit = () => {
    if (validateVenue(newVenue)) {
      addVenue({
        variables: {
          name: newVenue.name,
          typeId: newVenue.type.id,
          streetAddress: newVenue.streetAddress,
          zipcode: parseInt(newVenue.zipcode),
          cityId: newVenue.city.id
        }
      }).then(response => {
        setNewVenue({ ...venueStub })
        toggleDialog()
      })
    } else {
      setUserActionText(USER_ACTION_TEXT_ERROR)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      fullScreen={true}
      aria-labelledby="form-dialog-title"
    >
      <AppBar style={style.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogTitle style={style.title}>Add New Destination</DialogTitle>
      <DialogContent style={style.body}>
        <DialogContentText>{userActionText}</DialogContentText>
        <TextField
          id="venue-name"
          label="Venue name"
          value={newVenue.name}
          onChange={handleChange('name')}
          margin="normal"
          style={style.input}
        />
        <br />
        <VenueTypeFormField onVenueTypeSelected={onVenueTypeSelected} />
        <br />
        <TextField
          id="venue-street-address"
          name="street-address"
          label="Street address"
          value={newVenue.streetAddress}
          onChange={handleChange('streetAddress')}
          margin="normal"
          autoComplete="shipping street-address"
          style={style.input}
        />
        <CityFormField onCitySelected={onCitySelected} />

        <NumberFormat
          customInput={TextField}
          id="venue-zipcode"
          name="zipcode"
          label="Zipcode"
          value={newVenue.zipcode}
          onChange={handleChange('zipcode')}
          margin="normal"
          style={style.input}
          autoComplete="postal-code"
          format="#####"
        />
        {similarVenues && similarVenues.length && (
          <div>
            <div>
              Are you adding{' '}
              {similarVenues.length > 1
                ? 'one of these destinations'
                : 'this destination'}
              ?
            </div>
            {similarVenues.map(similarVenue => (
              <div key={similarVenue.id}>
                <strong>{similarVenue.name}</strong>, a{' '}
                {venuePrimaryTypeName(similarVenue)} in{' '}
                {venueCityState(similarVenue)}
              </div>
            ))}
          </div>
        )}
        <div>
          <Button color="primary" onClick={onSubmit}>
            Create venue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddVenueDialog
