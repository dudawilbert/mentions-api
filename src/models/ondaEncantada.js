const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  analogo: {
    type: Object,
    required: true,
    children: {
      selo: {
        type: String,
        required: true
      },
      tom: {
        type: String,
        required: true
      }
    }
  },
});

module.exports = mongoose.model('OndaEncantada', schema);