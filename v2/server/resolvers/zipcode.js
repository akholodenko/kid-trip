import Zipcode from '../models/zipcode'

async function getZipCode(zipcode) {
  const response = await Zipcode.findOne({
    where: { zip: zipcode },
    attributes: ['zip', 'lat', 'lng']
  })

  return { lat: response.lat, lng: response.lng }
}

module.exports.getZipCode = getZipCode
