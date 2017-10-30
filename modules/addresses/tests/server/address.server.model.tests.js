'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Address = mongoose.model('Address');

/**
 * Globals
 */
var user,
  address;

/**
 * Unit tests
 */
describe('Address Model Unit Tests:', function() {
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
      address = new Address({
        name: 'Address name',
        surname: 'Address surname',
        address: 'Address address',
        subdistrict:'Address subdistrict',
        district:'Address district',
        province:'Address province',
        postcode:'Address postcode',
        tel:'Address tel',
        sort:'sender',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return address.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      address.name = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without surname', function(done) {
      address.surname = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without address', function(done) {
      address.address = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without subdistrict', function(done) {
      address.subdistrict = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without district', function(done) {
      address.district = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without province', function(done) {
      address.province = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without postcode', function(done) {
      address.postcode = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without tel', function(done) {
      address.tel = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without sort', function(done) {
      address.sort = '';

      return address.save(function(err) {
        should.exist(err);
        done();
      });
    });
    
  });

  afterEach(function(done) {
    Address.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
