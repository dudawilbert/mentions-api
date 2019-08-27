const mongoose = require('mongoose');
const Calendario = mongoose.model('Calendario');
const Selos = mongoose.model('Selos');
const Tons = mongoose.model('Tons');

exports.listCalendario = async () => {
  const res = await Calendario.find({});
  return res;
};
exports.listSincronario = async () => {
  const res = await Calendario.find({});
  return res;
};
exports.listSincronarioId = async (id) => {
  const res = await Calendario.find({numero: id});
  return res;
};
exports.listSeloSincronario = async (selo) => {
  const res = await Selos.find({numero: selo}, 'nome numero');
  return res;
};
exports.listTomSincronario = async (tom) => {
  const res = await Tons.find({numero: tom}, 'nome nomeFeminino numero');
  return res;
};
exports.luaAtual = async (tom) => {
  const res = await Tons.find({numero: tom}, 'nome numero nomeFeminino');
  return res;
};
exports.createCalendario = async data => {
  const selo = new Calendario(data);
  await selo.save();
};
exports.createSincronario = async data => {
  const selo = new Calendario(data);
  await selo.save();
};

exports.updateCalendario = async (id, data) => {
  console.log('id', id)
  await Calendario.findByIdAndUpdate(id, {
    $set: data
  });
};
exports.updateSincronario = async (id, data) => {
  console.log('id', id)
  await Calendario.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deleteCalendario = async id => {
  await Calendario.findOneAndRemove({numero: id});
};
exports.deleteSincronario = async id => {
  await Calendario.findOneAndRemove({numero: id});
};