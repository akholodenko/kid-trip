import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";
import User from "../models/user";
import Venue from "../models/venue";
import City from "../models/city";

import { fromDbVenueTransform } from "./venue";
import VenueType from "../models/venue_type";

import { sendWelcomeEmail } from "../utils/emailUtils";

const fromDbUserTransform = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    zipcode: user.zipcode,
    venues: user.venues
      ? user.venues.map(venue => fromDbVenueTransform(venue))
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

  if (fields && !!fields.venues) {
    let venueAssociations = [];

    if (!!fields.venues.venueTypes) {
      venueAssociations.push({ model: VenueType });
    }

    if (!!fields.venues.city || !!fields.venues.state) {
      venueAssociations.push({ model: City });
    }

    associations.push({
      model: Venue,
      attributes: [
        "id",
        "name",
        "slug",
        "street_address",
        "zipcode",
        "lat",
        "lng"
      ],
      include: venueAssociations
    });
  }

  return User.findByPk(userId, {
    attributes: ["id", "first_name", "last_name", "email", "zipcode"],
    include: associations
  }).then(user => fromDbUserTransform(user));
};

module.exports = {
  signup,
  login,
  getUser,
  fromDbUserTransform
};
