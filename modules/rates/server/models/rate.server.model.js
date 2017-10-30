'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rate Schema
 */
var RateSchema = new Schema({
  size:{
    type: String,
    default: '',
    required: 'Please fill Rate size',
    trim: true
  },
  price:{
    type: Number,
    required: 'Please fill Rate price',
    trim: true
  },
  rates:{
    type: String,
    default: '',
    required: 'Please fill Rate rates',
    trim: true,
    enum:['lamunphan', 'thaipost']
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Rate', RateSchema);
