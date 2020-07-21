"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("venues", "user_id", {
        type: Sequelize.INTEGER
      })
      .then(() => {
        queryInterface.addIndex("venues", ["user_id"], {
          indexName: "venues_user_id_index"
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("venues", "user_id");
  }
};
