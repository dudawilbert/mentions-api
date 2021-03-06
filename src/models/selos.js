const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  maia: {
    type: String,
    required: true
  },
  poder: {
    type: String,
    required: true
  },
  acao: {
    type: String,
    required: true
  },
  essencia: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Selos', schema);