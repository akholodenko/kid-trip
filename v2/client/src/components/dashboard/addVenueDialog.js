import React, { useState } from 'react'

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

import { useMutation } from '@apollo/react-hooks'
import { GET_VENUES_FOR_CURRENT_USER } from '../../graphql/venueQueries'

const USER_ACTION_TEXT = 'Please enter information about a venue'
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

export default props => {
  const [addVenue] = useMutation(CREATE_VENUE_MUTATION, {
    onError(error) {
      console.log('error', error)
    },
    onCompleted(data) {
      console.log('data', data)
    },
    refetchQueries: [
      {
        query: GET_VENUES_FOR_CURRENT_USER
      }
    ]
  })

  const [newVenue, setNewVenue] = useState({ ...venueStub })
  const [userActionText, setUserActionText] = useState(USER_ACTION_TEXT)

  const onCitySelected = city => {
    if (city && city.value) {
      setNewVenue({ ...newVenue, city: { id: city.value } })
    } else {
      setNewVenue({ ...newVenue, city: {} })
    }
  }

  const onVenueTypeSelected = venueTypeId => {
    console.log('venueTypeId selected:', venueTypeId)
    setNewVenue({ ...newVenue, type: { id: venueTypeId } })
  }

  const handleChange = name => event => {
    console.log(name, event.target.value)
    setNewVenue({ ...newVenue, [name]: event.target.value })
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
        console.log('response', response)

        setNewVenue({ ...venueStub })

        props.toggleDialog()
      })
    } else {
      setUserActionText(USER_ACTION_TEXT_ERROR)
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.toggleDialog}
      fullScreen={true}
      aria-labelledby="form-dialog-title"
    >
      <AppBar style={style.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.toggleDialog}
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
        <div>
          <Button color="primary" onClick={onSubmit}>
            Create venue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
