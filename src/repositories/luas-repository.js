const mongoose = require('mongoose');
const Luas = mongoose.model('Luas');

exports.listLuas = async (id) => {
  const res = await Luas.find({numero: id});
  return res;
};
exports.listLuasId = async (lua) => {
  // transforma o primeiro caracter em maiusculo
  lua = lua.replace(lua[0], lua[0].toUpperCase());
  const res = await Luas.find({nome: lua});
  return res;
};
exports.listLuasIdCompleto = async (id) => {
  const res = await Luas.find({numero: id});
  return res;
};

exports.createLua = async data => {
  const selo = new Luas(data);
  await selo.save();
};

exports.updateLua = async (id, data) => {
  console.log('id', id)
  await Luas.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deleteLua = async id => {
  await Luas.findOneAndRemove({numero: id});
};