const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  chakra: {
    type: String,
    required: true
  },
  afirmacao: {
    type: String,
    required: true
  },
  autoDeclaracao: {
    type: String,
    required: true
  },
  poder: {
    type: Object,
    required: true,
    children: {
      radion: {
        type: String,
        required: true,
      },
      acao: {
        type: String,
        required: true,
      }
    }
  },
  mentalizar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Plasmas', schema);