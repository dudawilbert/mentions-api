const mongoose = require('mongoose');
const listOraculo = mongoose.model('Oraculo');
const listaSelo = mongoose.model('Selos');
const listaTom = mongoose.model('Tons');

exports.listOraculo = async (selo, tom) => {
  const seloReturn = await listaSelo.find({numero: selo}, 'nome cor numero');
  const tomReturn = await listaTom.find({numero: tom}, 'nome numero');
  return {
    selo: seloReturn,
    tom: tomReturn    
  };
};
exports.listOraculoId = async (oraculo) => {
  // transforma o primeiro caracter em maiusculo
  oraculo = oraculo.replace(oraculo[0], oraculo[0].toUpperCase());
  const res = await listOraculo.find({nome: oraculo});
  return res;
};

// exports.createlistOraculo = async data => {
//   const selo = new listOraculo(data);
//   await selo.save();
// };

// exports.updatelistOraculo = async (id, data) => {
//   console.log('id', id)
//   await listOraculo.findByIdAndUpdate(id, {
//     $set: data
//   });
// };

// exports.deletelistOraculo = async id => {
//   await listOraculo.findOneAndRemove({numero: id});
// };