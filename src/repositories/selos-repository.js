const mongoose = require('mongoose');
const Selos = mongoose.model('Selos');

exports.listSelosCompleto = async () => {
  const res = await Selos.find({});
  return res;
};

exports.listSelosBasico = async () => {
  const res = await Selos.find({}, 'nome poder numero acao essencia img palavrasChave');
  return res;
};
exports.listSelosId = async (id) => {
  const res = await Selos.find({numero: id});
  return res;
};
exports.listSelosCalendario = async (id) => {
  const res = await Selos.find({numero: id}, 'nome numero poder acao essencia img palavrasChave');
  return res;
};


exports.createSelo = async data => {
  const selo = new Selos(data);
  await selo.save();
};

exports.updateSelo = async (id, data) => {
  await Selos.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deleteSelo = async id => {
  await Selos.findOneAndRemove({numero: id});
};