const mongoose = require('mongoose');

const { Schema } = mongoose;
const requiredString = {
  type: String,
  required: true,
};

const logEntrySchema = new Schema({
  title: requiredString,
  description: String,
  comment: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },

});
