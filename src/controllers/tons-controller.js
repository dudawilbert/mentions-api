const { validationResult } = require('express-validator');
const repository = require('../repositories/tons-repository');
// list
exports.listTonsCompleto = async (req, res) => {
  try {
    const data = await repository.listTonsCompleto();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os tons!'});
  }
};
exports.listTonsBasico = async (req, res) => {
  try {
    const data = await repository.listTonsBasico();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os tons!'});
  }
};
exports.listTonsId = async (req, res) => {
  try {
    const data = await repository.listTonsId(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os tons!'});
  }
};
exports.listTonsIdCompleto = async (req, res) => {
  try {
    const data = await repository.listTonsIdCompleto(req.params.id);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os tons!'});
  }
};
exports.listTonsIdCalendario = async (req, res) => {
  try {
    const data = await repository.listTonsIdCalendario(req.params.id);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os tons!'});
  }
};

// create
exports.createTom = async (req, res) => {
  try {
    await repository.createTom({
      nome: req.body.nome,
      numero: req.body.numero,
      maia: req.body.maia,
      poder: req.body.poder,
      acao: req.body.acao,
      essencia: req.body.essencia,
      img: req.body.img,
      descricao: req.body.descricao,
      sobreMim: req.body.sobreMim
    });
    res.status(201).send({message: 'Tom cadastrado com sucesso!'});
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao cadastrar o selo.'});
  }
};

// update
exports.updateTom = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.updateTom(req.params.id, req.body);
    res.status(200).send({
      message: 'Tom atualizada com sucesso!'
    });
  } catch (e) {
    console.log('e', e)
    res.status(500).send({message: 'Falha ao atualizar a selo.'});
  }
};

// delete
exports.deleteTom = async (req, res) => {
  try {
    console.log(req.params.id, 'id')
    await repository.deleteTom(req.params.id);
    res.status(200).send({
      message: 'Tom removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a selo.'});
  }
};