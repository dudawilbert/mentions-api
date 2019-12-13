const { validationResult } = require('express-validator');
const repository = require('../repositories/ondaEncantada-repository');
const repositoryCalendario = require('../repositories/calendario-repository');
// list
exports.descobreOndaEncantada = async (selo, tom) => {
  try {
    console.log('onda', selo, tom)
    var numTzolkinAtual = await repositoryCalendario.listSincronarioSeloTom(selo, tom)
    numTzolkinAntes = JSON.parse(JSON.stringify(numTzolkinAtual))
    numTzolkinDepois = JSON.parse(JSON.stringify(numTzolkinAtual))
    let ondaAntes = []
    let ondaDepois = []
    for (let i = 1; i < tom; i++) {
      numTzolkinAntes[0].numero--
      let ondaObj = await repositoryCalendario.listSincronarioId(numTzolkinAntes[0].numero)
      ondaAntes.unshift(ondaObj[0])
      if (i === tom - 1) {
        ondaAntes.push(numTzolkinAtual[0])
      }
    }
    for (let i = tom; i < 13; i++) {
      numTzolkinDepois[0].numero++
      let ondaObj = await repositoryCalendario.listSincronarioId(numTzolkinDepois[0].numero)
      ondaDepois.push(ondaObj[0])
    }
    // console.log('ondaAntes', ondaAntes)
    let ondaEncantada = ondaAntes.concat(ondaDepois)
    return ondaEncantada
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao carregar os ondaEncantada!'});
  }
};

exports.listOndaEncantada = async (req, res) => {
  try {
    var selo = parseInt(req.params.selo)
    var tom = parseInt(req.params.tom)
    var ondaEncantada = await this.descobreOndaEncantada(selo, tom)
    res.status(200).send({ondaEncantada});
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os ondaEncantada!'});
  }
};

// create
// exports.createOndaEncantada = async (req, res) => {
//   try {
//     await repository.createOndaEncantada({
//       nome: req.body.nome,
//       descricaoCompleta: req.body.descricaoCompleta,
//       descricao: req.body.descricao,
//       humor: req.body.humor,
//       favorece: req.body.favorece,
//       desfavorece: req.body.desfavorece,
//       beleza: req.body.beleza,
//       relacionamentos: req.body.relacionamentos,
//       financeiro: req.body.financeiro
//     });
//     res.status(201).send({message: 'OndaEncantada cadastrado com sucesso!'});
//   } catch (e) {
//     console.log(e)
//     res.status(500).send({message: 'Falha ao cadastrar o ondaEncantada.'});
//   }
// };

// update
// exports.updateOndaEncantada = async (req, res) => {
//   const {errors} = validationResult(req);

//   if(errors.length > 0) {
//     return res.status(400).send({message: errors})
//   }
//   try {
//     await repository.updateOndaEncantada(req.params.id, req.body);
//     res.status(200).send({
//       message: 'OndaEncantada atualizada com sucesso!'
//     });
//   } catch (e) {
//     console.log('e', e)
//     res.status(500).send({message: 'Falha ao atualizar a ondaEncantada.'});
//   }
// };

// delete
// exports.deleteOndaEncantada = async (req, res) => {
//   try {
//     console.log(req.params.id, 'id')
//     await repository.deleteOndaEncantada(req.params.id);
//     res.status(200).send({
//       message: 'OndaEncantada removida com sucesso!'
//     });
//   } catch (e) {
//     res.status(500).send({message: 'Falha ao remover a ondaEncantada.'});
//   }
// };