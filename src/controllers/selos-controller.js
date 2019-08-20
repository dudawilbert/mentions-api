const mongoose = require('mongoose');
const Selos = mongoose.model('Selos');

// list
exports.listSelos = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const data = await Selos.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções.'});
  }
};

// create
exports.createSelo = async (req, res) => {
  try {
    const mention = new Selos({
      friend: req.body.friend,
      mention: req.body.mention
    });

    console.log('mention', mention)

    await mention.save();

    res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    console.log('body', req.body)
    res.status(500).send({message: `Falha ao cadastrar a menção. ${e} + ${req.body}`});
  }
};