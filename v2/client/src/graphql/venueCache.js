import { GET_VENUE_BY_SLUG } from './venueQueries'

export const updateVenueStatsCache = (store, venueSlug, venueStats) => {
  if (store.data.data.ROOT_QUERY[`venueBySlug({"slug":"${venueSlug}"})`]) {
    let data = store.readQuery({
      query: GET_VENUE_BY_SLUG,
      variables: { venueSlug }
    })

    store.writeQuery({
      query: GET_VENUE_BY_SLUG,
      variables: { venueSlug },
      data: {
        ...data,
        venueBySlug: { ...data.venueBySlug, venueStats: { ...venueStats } }
      }
    })
  }
}
