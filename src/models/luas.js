const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricaoCompleta: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  humor: {
    type: String,
    required: true
  },
  favorece: {
    type: String,
    required: true
  },
  desfavorece: {
    type: String,
    required: true
  },
  beleza: {
    type: String,
    required: true
  },
  relacionamentos: {
    type: String,
    required: true
  },
  financeiro: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Luas', schema);