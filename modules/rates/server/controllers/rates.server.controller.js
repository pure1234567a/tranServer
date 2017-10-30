'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rate = mongoose.model('Rate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Rate
 */
exports.create = function(req, res) {
  var rate = new Rate(req.body);
  rate.user = req.user;

  rate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rate);
    }
  });
};

/**
 * Show the current Rate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var rate = req.rate ? req.rate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  rate.isCurrentUserOwner = req.user && rate.user && rate.user._id.toString() === req.user._id.toString();

  res.jsonp(rate);
};

/**
 * Update a Rate
 */
exports.update = function(req, res) {
  var rate = req.rate;

  rate = _.extend(rate, req.body);

  rate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rate);
    }
  });
};

/**
 * Delete an Rate
 */
exports.delete = function(req, res) {
  var rate = req.rate;

  rate.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rate);
    }
  });
};

/**
 * List of Rates
 */
exports.list = function(req, res) {
  Rate.find().sort('-created').populate('user', 'displayName').exec(function(err, rates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rates);
    }
  });
};

/**
 * Rate middleware
 */
exports.rateByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rate is invalid'
    });
  }

  Rate.findById(id).populate('user', 'displayName').exec(function (err, rate) {
    if (err) {
      return next(err);
    } else if (!rate) {
      return res.status(404).send({
        message: 'No Rate with that identifier has been found'
      });
    }
    req.rate = rate;
    next();
  });
};
