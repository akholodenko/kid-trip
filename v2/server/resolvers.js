import graphsqlFields from "graphql-fields";

import { initModelAssociations } from "./models/associations";
import {
  getVenue,
  getVenueBySlug,
  getSimilarVenuesInRadius,
  createVenue,
  createUserVenueFavorite
} from "./resolvers/venue";
import { getVenueType, getVenueTypes } from "./resolvers/venue_type";
import { getCities } from "./resolvers/city";
import { signup, login, getUser } from "./resolvers/user";

initModelAssociations();

export default {
  Query: {
    venue(obj, args, context, info) {
      return getVenue(args.id, { fields: graphsqlFields(info) });
    },
    venueBySlug(obj, args, context, info) {
      return getVenueBySlug(args.slug, { fields: graphsqlFields(info) });
    },
    venueTypes() {
      return getVenueTypes();
    },
    venueType(obj, args, context, info) {
      return getVenueType(args.id);
    },
    similarVenues(obj, args, context, info) {
      return getSimilarVenuesInRadius(args.id, args.radius, args.first, {
        fields: graphsqlFields(info)
      });
    },
    cities(obj, args) {
      return getCities({ limit: args.first, query: args.query });
    },
    user(obj, args, context, info) {
      return getUser(args.id, { fields: graphsqlFields(info) });
    },
    me(obj, args, { user }, info) {
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      return getUser(user.userId, { fields: graphsqlFields(info) });
    }
  },
  Mutation: {
    signup,
    login,
    createVenue,
    createUserVenueFavorite
  }
};
