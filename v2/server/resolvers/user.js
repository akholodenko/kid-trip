import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";
import User from "../models/user";
import Venue from "../models/venue";
import City from "../models/city";

import { fromDbVenueTransform, VENUE_ATTRIBUTES } from "./venue";
import VenueType from "../models/venue_type";

import { sendWelcomeEmail } from "../utils/emailUtils";
import UserVenueFavorite from "../models/user_venue_favorite";

const fromDbUserTransform = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    zipcode: user.zipcode,
    venues: user.venues
      ? user.venues.map(venue => fromDbVenueTransform(venue))
      : null,
    favoriteVenues: user.favoriteVenues
      ? user.favoriteVenues.map(venue => fromDbVenueTransform(venue))
      : null
  };
};

async function signup(parent, args) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await User.create({
    first_name: args.firstName,
    last_name: args.lastName,
    email: args.email,
    password,
    zipcode: args.zode || null
  }).then(newUser => {
    return fromDbUserTransform(newUser);
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  sendWelcomeEmail(user);

  return {
    token,
    user
  };
}

async function login(parent, args) {
  const user = await User.find({ where: { email: args.email } });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user: fromDbUserTransform(user)
  };
}

const getUser = (userId, { fields }) => {
  let associations = [];

  if (fields) {
    if (!!fields.venues) {
      let venueAssociations = [];

      if (!!fields.venues.venueTypes) {
        venueAssociations.push({ model: VenueType });
      }

      if (!!fields.venues.city || !!fields.venues.state) {
        venueAssociations.push({ model: City });
      }

      associations.push({
        model: Venue,
        attributes: VENUE_ATTRIBUTES,
        include: venueAssociations
      });
    }
  }

  return User.findByPk(userId, {
    attributes: ["id", "first_name", "last_name", "email", "zipcode"],
    include: associations,
    order: [[Venue, "name", "ASC"]]
  }).then(user => {
    if (!!fields && !!fields.favoriteVenues) {
      return getUserFavoriteVenues(userId, fields).then(response => {
        user.favoriteVenues = response;
        return fromDbUserTransform(user);
      });
    } else {
      return fromDbUserTransform(user);
    }
  });
};

const getUserFavoriteVenues = (userId, fields) => {
  let associations = [];

  if (!!fields.favoriteVenues.venueTypes) {
    associations.push({ model: VenueType });
  }

  if (!!fields.favoriteVenues.city || !!fields.favoriteVenues.state) {
    associations.push({ model: City });
  }

  associations.push({
    model: UserVenueFavorite,
    where: {
      user_id: userId
    }
  });

  return Venue.findAll({
    attributes: VENUE_ATTRIBUTES,
    include: associations,
    order: [["name", "ASC"]]
  });
};

module.exports = {
  signup,
  login,
  getUser,
  fromDbUserTransform
};
