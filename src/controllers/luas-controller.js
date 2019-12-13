const { validationResult } = require('express-validator');
const repository = require('../repositories/luas-repository');
// list

exports.listLuas = async (req, res) => {
  try {
    const data = await repository.listLuas(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os luas!'});
  }
};
exports.listLuasId = async (req, res) => {
  try {
    const data = await repository.listLuasId(req.params.lua);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os luas!'});
  }
};
exports.listLuasIdCompleto = async (req, res) => {
  try {
    const data = await repository.listLuasIdCompleto(req.params.id);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os luas!'});
  }
};

// create
exports.createLua = async (req, res) => {
  try {
    await repository.createLua({
      nome: req.body.nome,
      descricaoCompleta: req.body.descricaoCompleta,
      descricao: req.body.descricao,
      humor: req.body.humor,
      favorece: req.body.favorece,
      desfavorece: req.body.desfavorece,
      beleza: req.body.beleza,
      relacionamentos: req.body.relacionamentos,
      financeiro: req.body.financeiro
    });
    res.status(201).send({message: 'Lua cadastrado com sucesso!'});
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao cadastrar o lua.'});
  }
};

// update
exports.updateLua = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.updateLua(req.params.id, req.body);
    res.status(200).send({
      message: 'Lua atualizada com sucesso!'
    });
  } catch (e) {
    console.log('e', e)
    res.status(500).send({message: 'Falha ao atualizar a lua.'});
  }
};

// delete
exports.deleteLua = async (req, res) => {
  try {
    console.log(req.params.id, 'id')
    await repository.deleteLua(req.params.id);
    res.status(200).send({
      message: 'Lua removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a lua.'});
  }
};