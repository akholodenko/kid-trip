import { gql } from 'apollo-server'

export default gql`
  type UserProfile {
    user: User!
    config: UserProfileConfiguration!
    stats: UserProfileStats!
    recentFavoriteVenues: [Venue]
    recentAddedVenues: [Venue]
  }

  type UserProfileConfiguration {
    headerImageUrl: String
  }

  type UserProfileStats {
    created: Int
    favorited: Int
  }
`
