"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("venues", "description", {
      type: Sequelize.TEXT,
      after: "slug"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("venues", "description");
  }
};
