const mongoose = require('mongoose');
const Plasmas = mongoose.model('Plasmas');

exports.listPlasmas = async (id) => {
  const res = await Plasmas.find({numero: id});
  return res;
};
exports.listPlasmasId = async (plasma) => {
  // transforma o primeiro caracter em maiusculo
  plasma = plasma.replace(plasma[0], plasma[0].toUpperCase());
  const res = await Plasmas.find({nome: plasma});
  return res;
};
exports.listPlasmasIdCompleto = async (id) => {
  const res = await Plasmas.find({numero: id});
  return res;
};

exports.createPlasma = async data => {
  const selo = new Plasmas(data);
  await selo.save();
};

exports.updatePlasma = async (id, data) => {
  console.log('id', id)
  await Plasmas.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deletePlasma = async id => {
  await Plasmas.findOneAndRemove({numero: id});
};