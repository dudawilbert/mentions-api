const mongoose = require('mongoose');
const listOndaEncantada = mongoose.model('OndaEncantada');

exports.listOndaEncantada = async (selo, tom) => {
  const seloReturn = await listaSelo.find({numero: selo}, 'nome cor numero');
  const tomReturn = await listaTom.find({numero: tom}, 'nome numero');
  listaCalendario
  return {
    selo: seloReturn,
    tom: tomReturn    
  };
};
exports.listOndaEncantadaId = async (ondaEncantada) => {
  // transforma o primeiro caracter em maiusculo
  ondaEncantada = ondaEncantada.replace(ondaEncantada[0], ondaEncantada[0].toUpperCase());
  const res = await listOndaEncantada.find({nome: ondaEncantada});
  return res;
};

// exports.createlistOndaEncantada = async data => {
//   const selo = new listOndaEncantada(data);
//   await selo.save();
// };

// exports.updatelistOndaEncantada = async (id, data) => {
//   console.log('id', id)
//   await listOndaEncantada.findByIdAndUpdate(id, {
//     $set: data
//   });
// };

// exports.deletelistOndaEncantada = async id => {
//   await listOndaEncantada.findOneAndRemove({numero: id});
// };