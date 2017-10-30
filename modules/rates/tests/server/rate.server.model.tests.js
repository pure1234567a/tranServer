'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Rate = mongoose.model('Rate');

/**
 * Globals
 */
var user,
  rate;

/**
 * Unit tests
 */
describe('Rate Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      rate = new Rate({
        size:'Rate size',
        price:900,
        rates:'lamunphan',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return rate.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without size', function(done) {
      rate.size = '';

      return rate.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without price', function(done) {
      rate.price = null;

      return rate.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without rates', function(done) {
      rate.rates = '';

      return rate.save(function(err) {
        should.exist(err);
        done();
      });
    });
    
  });

  afterEach(function(done) {
    Rate.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
