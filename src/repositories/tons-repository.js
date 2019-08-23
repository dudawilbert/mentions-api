const mongoose = require('mongoose');
const Tons = mongoose.model('Tons');

exports.listTonsCompleto = async () => {
  const res = await Tons.find({});
  return res;
};

exports.listTonsBasico = async () => {
  const res = await Tons.find({}, 'nome poder acao essencia img palavrasChave');
  return res;
};
exports.listTonsId = async (id) => {
  const res = await Tons.find({numero: id});
  return res;
};

exports.createTom = async data => {
  const selo = new Tons(data);
  await selo.save();
};

exports.updateTom = async (id, data) => {
  console.log('id', id)
  await Tons.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deleteTom = async id => {
  await Tons.findOneAndRemove({numero: id});
};