const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  numero: {
    type: String,
    required: true
  },
  selo: {
    type: String,
    required: true
  },
  tom: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Calendario', schema);