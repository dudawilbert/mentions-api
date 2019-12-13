const { validationResult } = require('express-validator');
const repository = require('../repositories/oraculo-repository');
const repositorySincronario = require('../repositories/calendario-repository');
// list
exports.descobreAnalogo = async (selo) => {
  if (selo === 19) {
    return 20
  } else if (selo === 20) {
    return 19
  } else {
    // alimenta array dos selos de 1 ate 9
    var arraySelos1 = []
    for (let i = 1; i <= 9; i++) {
      arraySelos1.push(i)
    }
    // alimenta array dos selos de 10 ate 18
    var arraySelos2 = []
    for (let i = 18; i >= 10; i--) {
      arraySelos2.push(i)
    }
    var indexSelo = -1
    if (selo <= 9) {
      return arraySelos2[selo - 1]
    } else {
      arraySelos2.forEach((element, index) => {
        if (element === selo) {
          indexSelo = index
        }
      })
      return arraySelos1[indexSelo]
    }
  }
}

exports.descobreAntipoda = async (selo) => {
  // alimenta array dos selos de 1 ate 9
  var arraySelos1 = []
  for (let i = 1; i <= 10; i++) {
    arraySelos1.push(i)
  }
  // alimenta array dos selos de 10 ate 18
  var arraySelos2 = []
  for (let i = 11; i <= 20; i++) {
    arraySelos2.push(i)
  }
  var indexSelo = -1
  if (selo <= 10) {
    return arraySelos2[selo - 1]
  } else {
    arraySelos2.forEach((element, index) => {
      if (element === selo) {
        indexSelo = index
      }
    })
    return arraySelos1[indexSelo]
  }
}

exports.descobreOculto = async (selo, tom) => {
  var tomReturn = 14 - tom
  // alimenta array dos selos de 1 ate 9
  var arraySelos1 = []
  for (let i = 1; i <= 10; i++) {
    arraySelos1.push(i)
  }
  // alimenta array dos selos de 10 ate 18
  var arraySelos2 = []
  for (let i = 20; i >= 11; i--) {
    arraySelos2.push(i)
  }
  var indexSelo = -1
  if (selo <= 9) {
    return {
      selo: arraySelos2[selo - 1],
      tom: tomReturn
    }
    
  } else {
    arraySelos2.forEach((element, index) => {
      if (element === selo) {
        indexSelo = index
      }
    })
    return {
      selo: arraySelos1[indexSelo],
      tom: tomReturn
    }
  }
}

exports.descobreGuia = async (selo, tom) => {
  switch (tom) {
    case 1:
    case 6:
    case 11:
      return selo
    case 2:
    case 7:
    case 12:
      let seloMais12 = await repositorySincronario.listSincronarioId(selo + 12)
      return seloMais12[0].selo
    case 3:
    case 8:
    case 13:
      let seloMais4 = await repositorySincronario.listSincronarioId(selo + 4)
      return seloMais4[0].selo
    case 4:
    case 9:
      let seloMais16 = await repositorySincronario.listSincronarioId(selo + 16)
      return seloMais16[0].selo
    case 5:
    case 10:
      let seloMais8 = await repositorySincronario.listSincronarioId(selo + 8)
      return seloMais8[0].selo
  }
}

exports.listOraculo = async (req, res) => {
  try {
    var selo = parseInt(req.params.selo)
    var tom = parseInt(req.params.tom)
    var analogo = await this.descobreAnalogo(selo)
    var antipoda = await this.descobreAntipoda(selo)
    // ATENÇÃO !! APENAS NO KIN OCULTO PRECISA DE UMA LOGICA PARA DESOCBRER O TOM
    // NOS OUTROS CASOS O TOM SEMPRE É O MESMO
    var oculto = await this.descobreOculto(selo, tom)
    var guia = await this.descobreGuia(selo, tom)
    res.status(200).send({
      analogo: {
        selo: analogo,
        tom: tom
      },
      antipoda: {
        selo: antipoda,
        tom: tom
      },
      oculto: oculto,
      guia: {
        selo: guia,
        tom: tom
      }
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os oraculo!'});
  }
};
exports.listOraculoId = async (req, res) => {
  try {
    const data = await repository.listOraculoId(req.params.oraculo);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os oraculo!'});
  }
};

// create
// exports.createOraculo = async (req, res) => {
//   try {
//     await repository.createOraculo({
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
//     res.status(201).send({message: 'Oraculo cadastrado com sucesso!'});
//   } catch (e) {
//     console.log(e)
//     res.status(500).send({message: 'Falha ao cadastrar o oraculo.'});
//   }
// };

// update
// exports.updateOraculo = async (req, res) => {
//   const {errors} = validationResult(req);

//   if(errors.length > 0) {
//     return res.status(400).send({message: errors})
//   }
//   try {
//     await repository.updateOraculo(req.params.id, req.body);
//     res.status(200).send({
//       message: 'Oraculo atualizada com sucesso!'
//     });
//   } catch (e) {
//     console.log('e', e)
//     res.status(500).send({message: 'Falha ao atualizar a oraculo.'});
//   }
// };

// delete
// exports.deleteOraculo = async (req, res) => {
//   try {
//     console.log(req.params.id, 'id')
//     await repository.deleteOraculo(req.params.id);
//     res.status(200).send({
//       message: 'Oraculo removida com sucesso!'
//     });
//   } catch (e) {
//     res.status(500).send({message: 'Falha ao remover a oraculo.'});
//   }
// };