const { validationResult } = require('express-validator');
const repository = require('../repositories/calendario-repository');
const moment = require('moment');
// list
// retonra a matriz tzolkin
exports.listSincronario = async (req, res) => {
  try {
    const data = await repository.listSincronario();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};
// filtra o matriz por numero (soma lista calendario)
exports.listSincronarioId = async (req, res) => {
  try {
    const data = await repository.listSincronario(id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};
exports.calcMonth = async (currentDate) => {
  try {
    var year = moment(currentDate, 'YYYY-MM-DD').format('YYYY')
    var date = moment(`${year}-07-26`, 'YYYY-MM-DD')
    var diff = date.diff(currentDate, 'days')
    var monthMoon = 1
    var dayMoon
    diff = Math.abs(diff)
    if (diff > 28) {
      for (let i = 0; i <= diff; i++) {
        if (diff < 28) {
          dayMoon = diff + 1
        } else {
          monthMoon++
          diff -= 28
        }
      }
    } else {
      monthMoon = 1
    }
    var daysSmaller = []
    var daysBigger = []
    // dias antes do atual
    for (let i = 0; i < diff; i++) {
      let newDate
      if (daysSmaller.length === 0) {
        newDate = moment(currentDate, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD')
      } else {
        newDate = moment(daysSmaller[daysSmaller.length - 1].dataGregoriana, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD')
      }
      var total = await this.calcKin(newDate)
      var obj = {
        dataGregoriana: newDate,
        total: total
      }
      daysSmaller.push(obj)
    }
    daysSmaller = daysSmaller.reverse()
    // dias depois do atual
    for (let i = 28; i >= dayMoon; i--) {
      let newDate
      if (daysBigger.length === 0) {
        newDate = moment(currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
      } else {
        newDate = moment(daysBigger[daysBigger.length - 1].dataGregoriana, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
      }
      var total = await this.calcKin(newDate)
      var obj = {
        dataGregoriana: newDate,
        total: total
      }
      daysBigger.push(obj)
    }
    return daysSmaller.concat(daysBigger)
  } catch (erro) {
    console.log('erro calcula mes tzolkin', erro)
  }
}
  
exports.calcKin = async (currentDate) => {
  try {
    // descobri o codigo do mes
    var codMonth = null
    switch (moment(currentDate, 'YYYY-MM-DD').format('MM')) {
      case '01': 
      codMonth = 0
        break;
      case '02': 
        codMonth = 31
        break;
      case '03': 
        codMonth = 59
        break;
      case '04': 
        codMonth = 90
        break;
      case '05': 
        codMonth = 120
        break;
      case '06': 
        codMonth = 151
        break;
      case '07': 
        codMonth = 181
        break;
      case '08': 
        codMonth = 212
        break;
      case '09': 
        codMonth = 243
        break;
      case '10': 
        codMonth = 13
        break;
      case '11': 
        codMonth = 44
        break;
      case '12': 
        codMonth = 74
        break;
    }
    // descobri codigo do ano
    var codYear = 0
    var ultfaixafinal = 1753;
    var possibleCodeYear = [62, 167, 12, 117, 222, 67, 172, 17, 122, 227, 72, 177, 22, 127, 232, 77, 182, 27, 132, 237, 82, 187, 32, 137, 242, 87, 192, 37, 142, 247, 92, 197, 42, 147, 252, 97, 202, 47, 152, 257, 102, 207, 52, 157, 2, 107, 212, 57, 162, 7, 112, 217]
    var year = moment(currentDate, 'YYYY-MM-DD').format('YYYY')
    for (var x = 0; x < 40; x++) {
      if (x != 0) {
        var faixaInicial = ultfaixafinal + 1;
        var faixaFinal = ultfaixafinal + 52;
        if (year >= faixaInicial && year <= faixaFinal) {
            //Achou...
            let possibleCodeYearReverse = possibleCodeYear.reverse()
            // console.log(`A posição é...${faixaFinal - year + 1}`, possibleCodeYearReverse[faixaFinal - year]);
            codYear = possibleCodeYearReverse[faixaFinal - year]
        }
        ultfaixafinal = ultfaixafinal + 52;
      }
    }
    // somando para desocbri o codigo
    var day = moment(currentDate, 'YYYY-MM-DD').format('DD')
    var total = codYear + codMonth + parseInt(day)
    if (total > 260) {
      total -= 260
    }
    return total
  } catch (erro) {
    console.log('erro calcula kin', erro)
  }
}

// logica para desocbri o numero da matriz
exports.listCalendario = async (req, res) => {
  try {
    // DESCOBRIR OS KINS DIARIOS E TONS
    // req.params.currentDate esta no formato DD/MM/YYYY
    const currentDate = moment(req.params.currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
    if (req.params.mes) {
      var month = await this.calcMonth(currentDate)
      var monthFinsh = []
    //   daysWeek: [
    //     [1, 2, 3, 4, 5, 6, 7],
    //     [8, 9, 10, 11, 12, 13, 14],
    //     [15, 16, 17, 18, 19, 20, 21],
    //     [22, 23, 24, 25, 26, 27, 28],
    // ]
      var semana1 = []
      var semana2 = []
      var semana3 = []
      var semana4 = []
      for (let [index, element] of month.entries()) {
        // console.log(element, index)
        const dataSincronario = await repository.listSincronarioId(element.total);
        const dataSelo = await repository.listSeloSincronario(dataSincronario[0].selo);
        const dataTom = await repository.listTomSincronario(dataSincronario[0].tom);
        obj = {
          dataLua: index + 1,
          dataGregoriana: element.dataGregoriana,
          selo: dataSelo[0],
          tom: dataTom[0]
        }
        if (index + 1 <= 7 ) {
          semana1.push(obj)
        } else if (index + 1 > 7 && index + 1 <= 14) {
          semana2.push(obj)
        } else if (index + 1 > 14 && index + 1 <= 21) {
          semana3.push(obj)
        } else if (index + 1 > 21 && index + 1 <= 28) {
          semana4.push(obj)
        }
        monthFinsh = [semana1, semana2, semana3, semana4]
      }
      console.log(semana1, semana2, semana3, semana4)
      res.status(200).send(monthFinsh);
    } else {
      var total = await this.calcKin(currentDate)
      const dataSincronario = await repository.listSincronarioId(total);
      const dataSelo = await repository.listSeloSincronario(dataSincronario[0].selo);
      const dataTom = await repository.listTomSincronario(dataSincronario[0].tom);
      var kin = [{
        selo: dataSelo,
        tom: dataTom
      }]
      res.status(200).send(kin);
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao carregar os sincronario!'});
  }
};

// create
exports.createCalendario = async (req, res) => {
  try {
    await repository.createCalendario({
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
    res.status(201).send({message: 'Calendario cadastrado com sucesso!'});
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao cadastrar o selo.'});
  }
};
exports.createSincronario = async (req, res) => {
  try {
    await repository.createSincronario({
      numero: req.body.numero,
      selo: req.body.selo,
      tom: req.body.tom
    });
    res.status(201).send({message: 'Sincronario cadastrado com sucesso!'});
  } catch (e) {
    console.log(e)
    res.status(500).send({message: 'Falha ao cadastrar o selo.'});
  }
};

// update
exports.updateSincronario = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.updateSincronario(req.params.id, req.body);
    res.status(200).send({
      message: 'Sincronario atualizada com sucesso!'
    });
  } catch (e) {
    console.log('e', e)
    res.status(500).send({message: 'Falha ao atualizar a selo.'});
  }
};
exports.updateSincronario = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.updateSincronario(req.params.id, req.body);
    res.status(200).send({
      message: 'Sincronario atualizada com sucesso!'
    });
  } catch (e) {
    console.log('e', e)
    res.status(500).send({message: 'Falha ao atualizar a selo.'});
  }
};

// delete
exports.deleteSincronario = async (req, res) => {
  try {
    console.log(req.params.id, 'id')
    await repository.deleteSincronario(req.params.id);
    res.status(200).send({
      message: 'Sincronario removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a selo.'});
  }
};
exports.deleteSincronario = async (req, res) => {
  try {
    console.log(req.params.id, 'id')
    await repository.deleteSincronario(req.params.id);
    res.status(200).send({
      message: 'Sincronario removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a selo.'});
  }
};