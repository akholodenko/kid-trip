'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'zipcode', {
      type:  Sequelize.STRING(5),
      after: 'password'
    }).then(() => {
      queryInterface.addIndex('users', ['zipcode'], {
        indexName: 'users_zipcode_index',
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'zipcode')
  }
};
