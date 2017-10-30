'use strict';

/**
 * Module dependencies
 */
var addressesPolicy = require('../policies/addresses.server.policy'),
  addresses = require('../controllers/addresses.server.controller');

module.exports = function(app) {
  // Addresses Routes
  app.route('/api/addresses').all(addressesPolicy.isAllowed)
    .get(addresses.list)
    .post(addresses.create);

  app.route('/api/addresses/:addressId').all(addressesPolicy.isAllowed)
    .get(addresses.read)
    .put(addresses.update)
    .delete(addresses.delete);

  // Finish by binding the Address middleware
  app.param('addressId', addresses.addressByID);
};
