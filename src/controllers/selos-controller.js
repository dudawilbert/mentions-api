const repository = require('../repositories/selos-repository');
// list
exports.listSelosCompleto = async (req, res) => {
  try {
    const data = await repository.listSelosCompleto();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os selos!'});
  }
};
exports.listSelosBasico = async (req, res) => {
  try {
    const data = await repository.listSelosBasico();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os selos!'});
  }
};

// create
exports.createSelo = async (req, res) => {
  try {
    await repository.createSelo({
      nome: req.body.nome,
      numero: req.body.numero,
      maia: req.body.maia,
      poder: req.body.poder,
      acao: req.body.acao,
      essencia: req.body.essencia,
      arquetipo: {
          nome: req.body.arquetipo.nome,
          img: req.body.arquetipo.img,
          descricao: req.body.arquetipo.descricao
      },
      img: req.body.img,
      palavrasChave: req.body.palavrasChave,
      descricao: req.body.descricao,
      sobreMim: req.body.sobreMim
    });
    res.status(201).send({message: 'Selo cadastrado com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar o selo.'});
  }
};