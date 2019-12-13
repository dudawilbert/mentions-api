const { validationResult } = require('express-validator');
const repository = require('../repositories/selos-repository');
const moment = require('moment');
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
exports.listSelosId = async (req, res) => {
  try {
    const data = await repository.listSelosId(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os selos!'});
  }
};
exports.listSelosIdCompleto = async (req, res) => {
  try {
    const data = await repository.listSelosIdCompleto(req.params.id);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os selos!'});
  }
};
exports.listSelosCalendario = async (req, res) => {
  try {
    const data = await repository.listSelosCalendario(req.params.id);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os selos!'});
  }
};

// exports.listSelosCalendario = async (req, res) => {
//   try {
//     // DESCOBRIR OS KINS DIARIOS E TONS
//     // req.params.currentDate esta no formato DD/MM/YYYY
//     const currentDate = moment(req.params.currentDate).format('YYYY-MM-DD')
//     // descobri o codigo do mes
//     var codMonth = null
//     switch (moment(currentDate, 'YYYY-MM-DD').format('MM')) {
//       case '01': 
//       codMonth = 0
//         break;
//       case '02': 
//         codMonth = 31
//         break;
//       case '03': 
//         codMonth = 59
//         break;
//       case '04': 
//         codMonth = 90
//         break;
//       case '05': 
//         codMonth = 120
//         break;
//       case '06': 
//         codMonth = 151
//         break;
//       case '07': 
//         codMonth = 181
//         break;
//       case '08': 
//         codMonth = 212
//         break;
//       case '09': 
//         codMonth = 243
//         break;
//       case '10': 
//         codMonth = 13
//         break;
//       case '11': 
//         codMonth = 44
//         break;
//       case '12': 
//         codMonth = 74
//         break;
//     }
//     // descobri codigo do ano
//     var codYear = 0
//     var year = moment(currentDate, 'YYYY-MM-DD').format('YYYY')
//     var ultfaixafinal = 1753;
//     var possibleCodeYear = [62, 167, 12, 117, 222, 67, 172, 17, 122, 227, 72, 177, 22, 127, 232, 77, 182, 27, 132, 237, 82, 187, 32, 137, 242, 87, 192, 37, 142, 247, 92, 197, 42, 147, 252, 97, 202, 47, 152, 257, 102, 207, 52, 157, 2, 107, 212, 57, 162, 7, 112, 217]
//     for (var x = 0; x < 40; x++) {
//       if (x != 0) {
//         var faixaInicial = ultfaixafinal + 1;
//         var faixaFinal = ultfaixafinal + 52;
//         if (year >= faixaInicial && year <= faixaFinal) {
//             //Achou...
//             let possibleCodeYearReverse = possibleCodeYear.reverse()
//             // console.log(`A posição é...${faixaFinal - year + 1}`, possibleCodeYearReverse[faixaFinal - year]);
//             codYear = possibleCodeYearReverse[faixaFinal - year]
//         }
//         ultfaixafinal = ultfaixafinal + 52;
//       }
//     }
//     // somando para desocbri o codigo
//     var day = moment(currentDate, 'YYYY-MM-DD').format('DD')
//     var soma = codYear + codMonth + parseInt(day)
//     if (soma > 260) {
//       soma -= 260
//     }
//     var codeKin = 0
//     switch (soma) {
//       case 1: case 21: case 41: case 61: case 81:
//       case 101: case 121: case 141: case 161: 
//       case 181: case 201: case 221: case 241:
//         codeKin = 1
//         break;
//       case 2: case 22: case 42: case 62: case 82:
//       case 102: case 122: case 142: case 162: 
//       case 182: case 202: case 222: case 242:
//         codeKin = 2
//         break;
//       case 3: case 23: case 43: case 63: case 83:
//       case 103: case 123: case 143: case 163: 
//       case 183: case 203: case 223: case 243:
//         codeKin = 3
//         break;
//       case 4: case 24: case 44: case 64: case 84:
//       case 104: case 124: case 144: case 164: 
//       case 184: case 204: case 224: case 244:
//         codeKin = 4
//         break;
//       case 5: case 25: case 45: case 65: case 85:
//       case 105: case 125: case 145: case 165: 
//       case 185: case 205: case 225: case 245:
//         codeKin = 5
//         break;
//       case 6: case 26: case 46: case 66: case 86:
//       case 106: case 126: case 146: case 166: 
//       case 186: case 206: case 226: case 246:
//         codeKin = 6
//         break;
//       case 7: case 27: case 47: case 67: case 87:
//       case 107: case 127: case 147: case 167: 
//       case 187: case 207: case 227: case 247:
//         codeKin = 7
//         break;
//       case 8: case 28: case 48: case 68: case 88:
//       case 108: case 128: case 148: case 168: 
//       case 188: case 208: case 228: case 248:
//         codeKin = 8
//         break;
//       case 9: case 29: case 49: case 69: case 89:
//       case 109: case 129: case 149: case 169: 
//       case 189: case 209: case 229: case 249:
//         codeKin = 9
//         break;
//       case 10: case 30: case 50: case 60: case 70:
//       case 110: case 130: case 150: case 170: 
//       case 190: case 210: case 230: case 250:
//         codeKin = 10
//         break;
//       case 11: case 31: case 51: case 61: case 71:
//       case 111: case 131: case 151: case 171: 
//       case 191: case 211: case 231: case 251:
//         codeKin = 11
//         break;
//       case 12: case 32: case 52: case 62: case 72:
//       case 112: case 132: case 152: case 172: 
//       case 192: case 212: case 232: case 252:
//         codeKin = 12
//         break;
//       case 13: case 33: case 53: case 63: case 73:
//       case 113: case 133: case 153: case 173: 
//       case 193: case 213: case 233: case 253:
//         codeKin = 13
//         break;
//       case 14: case 34: case 54: case 64: case 74:
//       case 114: case 134: case 154: case 174: 
//       case 194: case 214: case 234: case 254:
//         codeKin = 14
//         break;
//       case 15: case 35: case 55: case 65: case 75:
//       case 115: case 135: case 155: case 175: 
//       case 195: case 215: case 235: case 255:
//         codeKin = 15
//         break;
//       case 16: case 36: case 56: case 66: case 76:
//       case 116: case 136: case 156: case 176: 
//       case 196: case 216: case 236: case 256:
//         codeKin = 16
//         break;
//       case 17: case 37: case 57: case 67: case 77:
//       case 117: case 137: case 157: case 177: 
//       case 197: case 217: case 237: case 257:
//         codeKin = 17
//         break;
//       case 18: case 38: case 58: case 68: case 78:
//       case 118: case 138: case 158: case 178: 
//       case 198: case 218: case 238: case 258:
//         codeKin = 18
//         break;
//       case 19: case 39: case 59: case 69: case 79:
//       case 119: case 139: case 159: case 179: 
//       case 199: case 219: case 239: case 259:
//         codeKin = 19
//         break;
//       case 20: case 40: case 60: case 80: case 100:
//       case 120: case 140: case 160: case 180: 
//       case 200: case 220: case 240: case 260:
//         codeKin = 20
//         break;
//     }
//     const data = await repository.listSelosCalendario(codeKin);
//     res.status(200).send(data);
//   } catch (e) {
//     res.status(500).send({message: 'Falha ao carregar os selos!'});
//   }
// };

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

// update
exports.updateSelo = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.updateSelo(req.params.id, req.body);
    res.status(200).send({
      message: 'Selo atualizada com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao atualizar a selo.'});
  }
};

// delete
exports.deleteSelo = async (req, res) => {
  try {
    console.log(req.params.id, 'id')
    await repository.deleteSelo(req.params.id);
    res.status(200).send({
      message: 'Selo removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a selo.'});
  }
};