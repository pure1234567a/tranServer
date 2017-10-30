'use strict';

/**
 * Module dependencies
 */
var ratesPolicy = require('../policies/rates.server.policy'),
  rates = require('../controllers/rates.server.controller');

module.exports = function(app) {
  // Rates Routes
  app.route('/api/rates').all(ratesPolicy.isAllowed)
    .get(rates.list)
    .post(rates.create);

  app.route('/api/rates/:rateId').all(ratesPolicy.isAllowed)
    .get(rates.read)
    .put(rates.update)
    .delete(rates.delete);

  // Finish by binding the Rate middleware
  app.param('rateId', rates.rateByID);
};
