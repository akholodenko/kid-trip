import Sequelize from "sequelize";
import sequelize from "../config/sequelize";

const UserVenueFavorite = sequelize.define(
  "userVenueFavorite",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    venue_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
  },
  {
    tableName: "users_venues_favorites",
    updatedAt: false
  }
);

export default UserVenueFavorite;
