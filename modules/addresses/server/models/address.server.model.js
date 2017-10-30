'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Address Schema
 */
var AddressSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Address name',
    trim: true
  },
  surname:{
    type: String,
    default: '',
    required: 'Please fill Address surname',
    trim: true
  },
  address:{
    type: String,
    default: '',
    required: 'Please fill Address address',
    trim: true
  },
  subdistrict:{
    type: String,
    default: '',
    required: 'Please fill Address subdistrict',
    trim: true
  },
  district:{
    type: String,
    default: '',
    required: 'Please fill Address district',
    trim: true
  },
  province:{
    type: String,
    default: '',
    required: 'Please fill Address province',
    trim: true
  },
  postcode:{
    type: String,
    default: '',
    required: 'Please fill Address postcode',
    trim: true
  },
  tel:{
    type: String,
    default: '',
    required: 'Please fill Address tel',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  sort:{
    type: String,
    default: '',
    required: 'Please fill Address sort',
    trim: true,
    enum:['sender', 'receiver']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Address', AddressSchema);
