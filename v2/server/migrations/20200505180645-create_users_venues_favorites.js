"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("users_venues_favorites", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        venue_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        queryInterface.addIndex("users_venues_favorites", ["venue_id"], {
          indexName: "users_venues_favorites_venue_index"
        });

        queryInterface.addIndex("users_venues_favorites", ["user_id"], {
          indexName: "users_venues_favorites_user_index"
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users_venues_favorites");
  }
};
