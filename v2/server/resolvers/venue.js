import sequelize from '../config/sequelize'

import Venue from '../models/venue'
import VenueType from '../models/venue_type'
import VenueClassification from '../models/venue_classification'
import User from '../models/user'
import UserVenue from '../models/user_venue'
import City from '../models/city'
import { getZipCode } from './zipcode'

import { slug, uniqueSlug } from "../utils/stringUtils"
import { fromMiles } from '../utils/numberUtils'

import { fromDbUserTransform } from './user'

export const fromDbVenueTransform = (venue) => {
	return {
		id: venue.id,
		name: venue.name,
		slug: venue.slug,
		streetAddress: venue.street_address,
		city: venue.city ? venue.city.name : null,
		state: venue.city ? venue.city.state : null,
		zipcode: venue.zipcode,
		lat: venue.lat,
		lng: venue.lng,
		venueTypes: venue.venueTypes,
		users: venue.users ? venue.users.map(user => fromDbUserTransform(user)) : null,
	}
}

export const getVenue = (venueId, { fields }) => {
	let associations = []

	if (!!fields.venueTypes) {
		associations.push({ model: VenueType })
	}

	if (!!fields.users) {
		associations.push({ model: User })
	}

	if (!!fields.city || !!fields.state) {
		associations.push({
			model: City,
			attributes: ['id', 'name', 'state'],
		})
	}

	return Venue.findByPk(venueId, {
		attributes: ['id', 'name', 'slug', 'street_address', 'zipcode', 'lat', 'lng'],
		include: associations,
	}).then((venue) => {
		return fromDbVenueTransform(venue)
	})
}

export const getVenueBySlug = (venueSlug, { fields }) => {
	console.log(venueSlug, venueSlug)
	let associations = []

	if (!!fields.venueTypes) {
		associations.push({ model: VenueType })
	}

	if (!!fields.users) {
		associations.push({ model: User })
	}

	if (!!fields.city || !!fields.state) {
		associations.push({
			model: City,
			attributes: ['id', 'name', 'state'],
		})
	}

	return Venue.findOne({
		where: { slug: venueSlug },
		attributes: ['id', 'name', 'slug', 'street_address', 'city_id', 'zipcode', 'lat', 'lng'],
		include: associations,
	}).then((venue) => {
		return fromDbVenueTransform(venue)
	})
}

export const getSimilarVenuesInRadius = (venueId = null, radius = 5, limit = 3, { fields }) => {
	return getVenue(venueId, { fields: { venueTypes: true } }).then(response => {
		const venueTypeId = response.venueTypes[0].id
		const lat = response.lat
		const lng = response.lng

		if (!lat || !lng) {
			return getZipCode(response.zipcode).then(coordinates => {
				return sqlQueryVenuesByTypeInRadius(venueTypeId, radius, coordinates, limit, [venueId])
			})
		} else {
			return sqlQueryVenuesByTypeInRadius(venueTypeId, radius, { lat: lat, lng: lng }, limit, [venueId])
		}
	})
}

const sqlQueryVenuesByTypeInRadius = (venueTypeId, radius, coordinates, limit, excludedVenueIds = []) => sequelize.query(`
			select * from
				(SELECT 
					venues.*,
					(ST_SetSRID(geom, 4269)::geography <-> ST_Transform(ST_SetSRID(ST_MakePoint(${coordinates.lat},${coordinates.lng}),4326),4269)::geography) as distance
				FROM venues
				join venues_classifications vc on vc.venue_id = venues.id
				where 
					venues.lat is not null and 
					vc.venue_type_id = ${venueTypeId} 
					${(excludedVenueIds ? ` and venues.id not in (${excludedVenueIds.join(',')})` : '')} 
				ORDER BY distance LIMIT ${limit}) as list
			where list.distance < ${fromMiles(radius)}`)
	.then(response => response[0].map(venue => fromDbVenueTransform(venue)))

export const createVenue = (obj, args, { user }, info) => {
	if (!user) {
		throw new Error('You are not authenticated!')
	}

	let venueSlug = slug(args.name)

	return getSimilarVenueSlugs(slug(venueSlug)).then((venues) => {
		const existingSlugs = venues.map(u => u.get("slug"))
		venueSlug = uniqueSlug(venueSlug, existingSlugs, args.zipcode)

		return Venue.create({
			name: args.name,
			slug: venueSlug,
			street_address: args.streetAddress,
			zipcode: args.zipcode,
			lat: args.lat,
			lng: args.lng,
			city_id: args.city.id,
		}).then(newVenue => {
			VenueClassification.create({
				venue_id: newVenue.id,
				venue_type_id: args.venueType.id,
			})

			UserVenue.create({
				venue_id: newVenue.id,
				user_id: user.userId,
			})

			return fromDbVenueTransform(newVenue)
		})
	})
}

const getSimilarVenueSlugs = slug => {
	return Venue.findAll({
		attributes: ['slug'],
		where: {
			slug: { $like: `${slug}%` },
		},
	})
}