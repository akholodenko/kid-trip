import Venue from '../models/venue'
import VenueType from '../models/venue_type'
import VenueClassification from '../models/venue_classification'
import User from '../models/user'
import UserVenue from '../models/user_venue'
import City from '../models/city'

import { slug, uniqueSlug } from "../utils/stringUtils"

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