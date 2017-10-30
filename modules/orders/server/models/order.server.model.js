'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  status: {
    type: String,
    default: 'waiting',
    required: 'Please fill Order status',
    trim: true
  },
  items: [{
    item: {
      type: Schema.ObjectId,
      ref: 'Rate'
    },
    qty: Number,
    total: Number
  }],
  sender: {
    type: Schema.ObjectId,
    ref: 'Address'
  },
  receiver: {
    type: Schema.ObjectId,
    ref: 'Address'
  },
  amount:Number,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Order', OrderSchema);
