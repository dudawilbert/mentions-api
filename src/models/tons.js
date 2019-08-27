const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  nomeFeminino: {
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
  },
  img: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  sobreMim: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tons', schema);