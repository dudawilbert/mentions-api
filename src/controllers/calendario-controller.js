const { validationResult } = require('express-validator');
const repository = require('../repositories/calendario-repository');
const repositoryTom = require('../repositories/tons-repository');
const repositorySelo = require('../repositories/selos-repository');
const moment = require('moment');
// list
// filtra o matriz por numero (soma lista calendario)
exports.listSincronarioId = async (req, res) => {
  try {
    const data = await repository.listSincronario(id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

exports.calcSeloAno = async (ano) => {
  try {
    var ano1 = 2017
    var selo1 = 4
    var tom1 = 12
    var selo2 = selo1
    var tom2 = tom1
    if (parseInt(ano) > ano1) {
      // ano é maior ano1
      var diferenca = parseInt(ano) - ano1
      for (let i = 0; i < diferenca; i++) {
        selo2 += 5
        tom2++
        if (tom2 > 13) {
          tom2 = 1
        }
        if (selo2 > 19) {
          selo2 = 4
        }
      }
    } else if (parseInt(ano) < ano1) {
      // ano é menor ano1
      var diferenca = ano1 - parseInt(ano)
      for (let i = 0; i < diferenca; i++) {
        selo2 -= 5
        tom2--
        if (tom2 < 1) {
          tom2 = 13
        }
        if (selo2 < 4) {
          selo2 = 19
        }
      }
    }
    return {
      tom: tom2,
      selo: selo2
    }
  } catch (erro) {
    console.log(erro)
  }
};

// desconre o selo e tom do ano atual
exports.anoAtual = async (req, res) => {
  try {
    var ids = await this.calcSeloAno(req.params.currentYear)
    // var selo = 5
    const data = await repository.anoAtual(ids);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

// desconre a lua atual
exports.luaAtual = async (req, res) => {
  try {
    var tom = await this.calcMonthTom(req.params.currentDate)
    const data = await repository.luaAtual(tom);
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

// é passado a data lunar e retorna a data gregoriana
exports.mesAtual = async (req, res) => {
  try {
    let ano = parseInt(req.params.diaLunar.split('-')[0])
    let lua = parseInt(req.params.diaLunar.split('-')[1])
    let dia = parseInt(req.params.diaLunar.split('-')[2])
    var data = await this.converteDataLuaInGreg(dia, lua, ano)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

exports.converteDataLuaInGreg = async (dia, lua, ano) => {
  try {
    var dataInit = `26-07-${ano}`
    diffDia = (dia - 1) + ((lua - 1) * 28)
    var dataGregoriana = moment(dataInit, 'DD-MM-YYYY').add(diffDia, 'days').format('YYYY-MM-DD')
    var obj = {
      day: moment(dataGregoriana, 'YYYY-MM-DD').format('DD'),
      month: moment(dataGregoriana, 'YYYY-MM-DD').format('MM'),
      year: moment(dataGregoriana, 'YYYY-MM-DD').format('YYYY')
    }
    return obj
  } catch (erro) {
    console.log('erro ao converter data lunar em gregoriana', erro)
  }
};
// descobre o dia e o mes no sincronario (transforma a data gregoriana em data lunar)
exports.calcCurrentMonth = async (currentDate, showDiff = false) => {
  // pega o ano atual
  console.log('date', currentDate)
  var year = moment(currentDate, 'YYYY-MM-DD').format('YYYY')
  // primeiro dia ano
  var date = moment(`${year}-07-26`, 'YYYY-MM-DD')
  // diferença entre a data atual e o primeiro dia do ano
  var diff = date.diff(currentDate, 'days')
  // mes lunar
  var monthMoon = 1
  // dia lunar
  var dayMoon
  // valida se a data é miaor ou menor q o dia fora do tempo
  // para saber ql logica se deve aplicar no for
  var menor = true
  if (diff < 1) {
    // está olhando um dia maior q o dia fora do tempo
    menor = false
    // transforma o numero em positivo
    diff = Math.abs(diff)
  }
  console.log('diff', diff)
  if (diff > 28) {
    // se o dia procurado for menor q o dia fora do tempo, começa no ultimo mes
    if (menor) monthMoon = 13
    for (let i = 0; i <= diff; i++) {
      console.log('for diff', diff)
      if (diff < 28) {
        // se for menor que 28 significa q ja está no mes certo
        // se o dia procurado for menor q o dia fora do tempo,
        // a data lunar é a diferença - 28 (dias) + 2 (dia fora do tempo e 1 ajuste),
        // se não, a data é a diferença + 1 (ajuste)
        dayMoon = menor ? 28 - diff + 2 : diff + 1
        console.log('if for', diff, dayMoon, i)
      } else if (diff > 28) {
        // a primeira vez que rodar vai entrar aq
        // se o dia procurado for menor q o dia fora do tempo,
        // vai decrescer a qtd de meses, se não, vai crescer a qtd de meses
        diff ? monthMoon-- : monthMoon++
        // tira 28 dias (um mes) da diferenca
        diff -= 28
        // validação para não deixar estourar os meses
        if (monthMoon < 1) {
          monthMoon = 13
        } else if (monthMoon > 13) {
          monthMoon = 1
        }
        console.log('else if for', diff, dayMoon, i)
        if (diff < i) {
          diff = i + 1
        }
      } else {
        dayMoon = 1
        console.log('else for', diff, dayMoon, i)
      }
    }
  } else if (diff === 1){
    // dia fora do tempo
    monthMoon = 0
    dayMoon = 0
  } else {
    // se o numero for menor q 28
    // sigfinica que está procurando uma data proxima
    if (menor) {
      // se a data for menor q o dia fora do tempo
      // siginifica q está no ultimo mes do ano
      monthMoon = 13
      // a data é a diferença - 28 (dias) + 2 (dia fora do tempo e 1 ajuste)
      dayMoon = 28 - diff + 2
    } else {
      // se a data for maior q o dia fora do tempo
      // siginifica q está no primeiro mes do ano
      monthMoon = 1
      // a data é a diferença + 1 (ajuste)
      dayMoon = diff + 1
    }
  }
  console.log('dayMoon', dayMoon)
  var obj = {
    day: dayMoon,
    month: monthMoon,
    year: year
  }
  if (showDiff) {
    obj.diff = diff
  }
  console.log('obj', obj)
  return obj
};
// calcula os dias gregoriano e o valor do tzolkin de um mes no calendairo 13 luas
exports.calcMonth = async (currentDate) => {
  try {
    var month = await this.calcCurrentMonth(currentDate, true)
    // console.log(month)
    var daysSmaller = []
    var daysBigger = []
    if (month.day > 1) {
      // dias antes do atual
      for (let i = 0; i < month.diff; i++) {
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
    }
    if (month.day < 28) {
      // dias depois do atual
      for (let i = 28; i >= month.day; i--) {
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
    }
    return daysSmaller.concat(daysBigger)
  } catch (erro) {
    console.log('erro calcula mes tzolkin', erro)
  }
};

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
};
// desconre a o mes atual (transforma o mes lunar em mes gregoriano)
// INITILIZAVÉL FUNÇÃO converteDataLuaInGreg ja retorna a data completa
exports.converteLuaInMes = async (dia, lua) => {
  var mes = 0
  if ((lua === 1 && (dia > 0 && dia <= 6)) || (lua === 13 && (dia > 4 && dia <= 28))) {
    mes = 7
  } else if ((lua === 1 && (dia > 6 && dia <= 28)) || (lua === 2 && (dia > 0 && dia <= 9))) {
    mes = 8
  } else if ((lua === 2 && (dia > 9 && dia <= 28 )) || (lua === 3 && (dia > 0 && dia <= 11))) {
    mes = 9
  } else if ((lua === 3 && (dia > 11 && dia <= 28 )) || (lua === 4 && (dia > 0 && dia <= 14))) {
    mes = 10
  } else if ((lua === 4 && (dia > 14 && dia <= 28 )) || (lua === 5 && (dia > 0 && dia <= 16))) {
    mes = 11
  } else if ((lua === 5 && (dia > 16 && dia <= 28 )) || (lua === 6 && (dia > 0 && dia <= 19))) {
    mes = 12
  } else if ((lua === 6 && (dia > 19 && dia <= 28 )) || (lua === 7 && (dia > 0 && dia <= 22))) {
    mes = 1
  } else if ((lua === 7 && (dia > 22 && dia <= 28 )) || (lua === 8 && (dia > 0 && dia <= 24))) {
    mes = 2
  } else if ((lua === 8 && (dia > 24 && dia <= 28 )) || (lua === 9 && (dia > 0 && dia <= 25))) {
    mes = 3
  } else if ((lua === 9 && (dia > 25 && dia <= 28 )) || (lua === 10 && (dia > 0 && dia <= 27))) {
    mes = 4
  } else if (lua === 11 || (lua === 10 && (dia > 27 && dia <= 28 )) || (lua === 12 && (dia > 0 && dia <= 2))) {
    mes = 5
  } else if (lua === 12 || (lua === 10 && (dia > 2 && dia <= 28 )) || (lua === 13 && (dia > 0 && dia <= 4))) {
    mes = 6
  }
  return mes
};
// descobre o tom lunar do mes
exports.calcMonthTom = async (currentDate) => {
  try {
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
    console.log('Erro ao tentar descobrir o tom do mes', erro)
  }
};
// retorna uma lista contendo 4 arrays (semans do mes) 
// dentro de cada array 7 objs (dias das semana)
// essa lista alimentara o calendario
exports.listCalendario = async (req, res) => {
  try {
    const currentDate = moment(req.params.currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
    // descobr o codigo do tom do mes
    var codigoTomMonth = await this.calcMonthTom(currentDate)
    // pega as informações do tom
    const monthTom = await repositoryTom.listTonsId(codigoTomMonth);
    // retorna todos os dias do mes com a data gregoriana e o valor da matriz tzolkin 
    var month = await this.calcMonth(currentDate)
    // console.log(month)
    // semanas dos meses
    var semana1 = []
    var semana2 = []
    var semana3 = []
    var semana4 = []
    for (let [index, element] of month.entries()) {
      // PERFORMACE RUIM POR CAUSA DESSA REQUISIÇÕES
      // tras as informações da matriz tzolkin: tom, selo e codigo
      const dataSincronario = await repository.listSincronarioId(element.total)
      // tras as informações do selo
      const dataSelo = await repositorySelo.listSelosId(dataSincronario[0].selo)
      // tras as informações do tom
      const dataTom = await repositoryTom.listTonsId(dataSincronario[0].tom)
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
    }
    console.log('semana1', semana1)
    console.log('semana2', semana2)
    console.log('semana3', semana3)
    console.log('semana4', semana4)
    res.status(200).send({
      mes: monthTom[0],
      dias: [semana1, semana2, semana3, semana4]
    })
  } catch (e) {
    console.log('Falha ao carregar os calendario!', e)
    res.status(500).send({message: 'Falha ao carregar os calendario!'});
  }
};

exports.listCalendarioId = async (req, res) => {
  const currentDate = moment(req.params.currentDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
  var currentMonth = await this.calcCurrentMonth(currentDate, false)
  var kin = currentMonth
  res.status(200).send(kin)
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
    await repository.deleteSincronario(req.params.id);
    res.status(200).send({
      message: 'Sincronario removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a selo.'});
  }
};