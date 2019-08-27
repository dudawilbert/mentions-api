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

// desconre a lua atual
exports.luaAtual = async (req, res) => {
  try {
    console.log('luaAtual controler')
    var tom = await this.calcTomLunar(req.params.currentDate)
    console.log('tom', tom)
    const data = await repository.luaAtual(tom);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

// calcula os dias gregoriano e o valor do tzolkin de um mes no calendairo 13 luas
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

// descobre o kin do dia
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

// descobre o tom lunar do mes
exports.calcTomLunar = async (currentDate, res = true) => {
  try {
    console.log('currentDate', currentDate)
    var month = moment(currentDate, 'YYYY-MM-DD').format('MM')
    var day = moment(currentDate, 'YYYY-MM-DD').format('DD')
    var tom = 0
    if ((parseInt(month) === 7 && parseInt(day) >= 26) || (parseInt(month) === 8 && parseInt(day) <= 22)) {
      tom = 1
    } else if ((parseInt(month) === 8 && parseInt(day) >= 23) || (parseInt(month) === 9 && parseInt(day) <= 19)) {
      tom = 2
    } else if ((parseInt(month) === 9 && parseInt(day) >= 20) || (parseInt(month) === 10 && parseInt(day) <= 17)) {
      tom = 3
    } else if ((parseInt(month) === 10 && parseInt(day) >= 18) || (parseInt(month) === 11 && parseInt(day) <= 14)) {
      tom = 4
    } else if ((parseInt(month) === 11 && parseInt(day) >= 15) || (parseInt(month) === 12 && parseInt(day) <= 12)) {
      tom = 5
    } else if ((parseInt(month) === 12 && parseInt(day) >= 13) || (parseInt(month) === 1 && parseInt(day) <= 9)) {
      tom = 6
    } else if ((parseInt(month) === 1 && parseInt(day) >= 10) || (parseInt(month) === 2 && parseInt(day) <= 6)) {
      tom = 7
    } else if ((parseInt(month) === 2 && parseInt(day) >= 7) || (parseInt(month) === 3 && parseInt(day) <= 6)) {
      tom = 8
    } else if ((parseInt(month) === 3 && parseInt(day) >= 7) || (parseInt(month) === 4 && parseInt(day) <= 3)) {
      tom = 9
    } else if ((parseInt(month) === 4 && parseInt(day) >= 4) || (parseInt(month) === 5 && parseInt(day) <= 1)) {
      tom = 10
    } else if ((parseInt(month) === 5 && parseInt(day) >= 2) || (parseInt(month) === 5 && parseInt(day) <= 29)) {
      tom = 11
    } else if ((parseInt(month) === 5 && parseInt(day) >= 30) || (parseInt(month) === 6 && parseInt(day) <= 26)) {
      tom = 12
    } else if ((parseInt(month) === 6 && parseInt(day) >= 27) || (parseInt(month) === 7 && parseInt(day) <= 24)) {
      tom = 13
    }
    return tom
  } catch (erro) {

  }
}
// logica para desocbri o numero da matriz
exports.listCalendario = async (req, res) => {
  console.log('listCalendario')
  try {
    // DESCOBRIR OS KINS DIARIOS E TONS
    // req.params.currentDate esta no formato DD/MM/YYYY
    const currentDate = moment(req.params.currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
    if (req.params.mes) {
      var month = await this.calcMonth(currentDate)
      var tomLunar = await this.calcTomLunar(currentDate)
      const monthTom = await repository.listTomSincronario(tomLunar);
      var monthFinsh = []
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
        monthFinsh = {
          mes: monthTom[0],
          dias: [semana1, semana2, semana3, semana4]
        }
      }
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