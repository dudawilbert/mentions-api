const { validationResult } = require('express-validator');
const repository = require('../repositories/plasmas-repository');
// list

exports.listPlasmas = async (req, res) => {
  try {
    const data = await repository.listPlasmas(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os plasmas!'});
  }
};
exports.listPlasmasId = async (req, res) => {
  try {
    const data = await repository.listPlasmasId(req.params.plasma);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os plasmas!'});
  }
};
exports.listPlasmasIdCompleto = async (req, res) => {
  try {
    const data = await repository.listPlasmasIdCompleto(req.params.id);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os plasmas!'});
  }
};

// create
exports.createPlasma = async (req, res) => {
  try {
    await repository.createPlasma({
      nome: req.body.nome,
      chakra: req.body.chakra,
      afirmacao: req.body.afirmacao,
      autoDeclaracao: req.body.autoDeclaracao,
      poder: req.body.poder,
      mentalizar: req.body.mentalizar
    });
    res.status(201).send({message: 'Plasma cadastrado com sucesso!'});
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao cadastrar o plasma.'});
  }
};

// update
exports.updatePlasma = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.updatePlasma(req.params.id, req.body);
    res.status(200).send({
      message: 'Plasma atualizada com sucesso!'
    });
  } catch (e) {
    console.log('e', e)
    res.status(500).send({message: 'Falha ao atualizar a plasma.'});
  }
};

// delete
exports.deletePlasma = async (req, res) => {
  try {
    console.log(req.params.id, 'id')
    await repository.deletePlasma(req.params.id);
    res.status(200).send({
      message: 'Plasma removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a plasma.'});
  }
};