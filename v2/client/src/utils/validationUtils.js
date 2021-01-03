export const validateVenue = ({ name, type, streetAddress, city, zipcode }) => {
  let valid = {
    name: false,
    type: false,
    streetAddress: false,
    city: false,
    zipcode: false
  }

  if (name && name.length >= 3) {
    valid.name = true
  }

  if (type && type.id) {
    valid.type = true
  }

  if (streetAddress && streetAddress.length >= 2) {
    valid.streetAddress = true
  }

  if (city && city.id) {
    valid.city = true
  }

  if (zipcode && !isNaN(parseInt(zipcode))) {
    valid.zipcode = true
  }

  return Object.values(valid).indexOf(false) === -1
}
