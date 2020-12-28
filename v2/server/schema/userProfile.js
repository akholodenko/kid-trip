import { gql } from 'apollo-server'

export default gql`
  type UserProfile {
    publicId: String
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
    followedByCurrentUser: Boolean
    followers: Int
    followees: Int
  }
`
