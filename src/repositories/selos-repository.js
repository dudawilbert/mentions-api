const mongoose = require('mongoose');
const Selos = mongoose.model('Selos');

exports.listSelosCompleto = async () => {
  const res = await Selos.find({});
  return res;
};

exports.listSelosBasico = async () => {
  const res = await Selos.find({}, 'nome poder acao essencia img palavrasChave');
  return res;
};

exports.createSelo = async data => {
  const selo = new Selos(data);
  await selo.save();
};