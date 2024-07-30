const Periods_Model = require('../models/periods_models')
const Events_Model = require('../models/events_models');
const { validate_periods, validate_events } = require('../models/validations')
const Response = require('../models/response')

function calWeeks(fDay = new Date(), lDay = new Date(), startWeek = 0) {
  const daysDifference = (lDay - fDay) / (1000 * 3600 * 24);
  const numWeeks = Math.ceil((daysDifference + fDay.getDay() - startWeek) / 7);
  console.debug('Numero de semanas', numWeeks);
  return numWeeks;
}

// Función para calcular la semana de inicio de cada mes
function semanasPorMes(periodo) {
  const { fechaInicio, fechaCulminacion, numeroSemanas } = periodo;

  // Convertir las fechas de inicio y culminación a objetos Date
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaCulminacion);

  // Calcular la diferencia en días entre la fecha de inicio y la fecha de culminación
  const diffTime = Math.abs(fin - inicio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calcular el número total de semanas en el rango
  const totalSemanas = Math.ceil(diffDays / 7);

  // Validar que el número de semanas proporcionado sea coherente
  if (numeroSemanas > totalSemanas) {
    console.error('El número de semanas proporcionado excede el rango de fechas.');
    return;
  }

  // Crear un objeto para almacenar el resultado
  const resultado = {};

  // Iterar sobre cada mes dentro del rango de fechas
  for (let d = new Date(inicio); d <= fin; d.setMonth(d.getMonth() + 1)) {
    const mes = d.getMonth();
    const año = d.getFullYear();

    // Calcular la fecha de inicio del mes
    const inicioMes = new Date(año, mes, 1);

    // Calcular la diferencia en días entre la fecha de inicio de la planificación y la fecha de inicio del mes
    const diffInicio = Math.abs(inicioMes - inicio);
    const diasDesdeInicio = Math.ceil(diffInicio / (1000 * 60 * 60 * 24));

    // Calcular la semana en la que empieza el mes
    const semanaInicioMes = Math.floor(diasDesdeInicio / 7) + 1;

    // Almacenar el resultado
    resultado[`${año}-${mes + 1}`] = semanaInicioMes == 1  ? 0 : semanaInicioMes;
  }

  return resultado;
}


class Periods_Controller {
  see_periods() {
    return new Promise((resolve, reject) => {
      Periods_Model.see_periods().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  search_periods(name) {
    return new Promise((resolve, reject) => {
      Periods_Model.search_periods(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  search_by(name, value) {
    return new Promise((resolve, reject) => {
      Periods_Model.search_periods_by(name, value).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  search_active() {
    return new Promise((resolve, reject) => {
      Periods_Model.search_periods_by('estado', 'activo').then((res) => { 
        //console.log(res.result[0])
        res.result = res.result[0];
        resolve(res); 
      }).catch((error) => { reject(error); })
    })
  }
  see_weeks() {
    return new Promise((resolve, reject) => {
      Periods_Model.search_periods_by('estado', 'activo')
        .then((res) => {
          let f1 = res.result[0].fecha_inicio;
          let f2 = res.result[0].fecha_cierre;
          //console.log(new Date(f1), new Date(f2), new Date(f2).getDay())
          let numW = calWeeks(new Date(f1), new Date(f2), new Date(f2).getDay());
          const periodo = {
            fechaInicio: f1,
            fechaCulminacion: f2,
            numeroSemanas: numW
          };
          res.result = semanasPorMes(periodo);
          console.log('Resultado', res.result);
          resolve(res)
        })
        .catch((error) => { reject(error); })
    })
  }
  register_periods(register) {
    return new Promise((resolve, reject) => {
      Periods_Model.register_periods(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
  register_periods_and_dates(register) { //Consulta para insertar dos cosas a la vez
    return new Promise((resolve, reject) => {
      let validateP = validate_periods(register[0], reject, true) //Validar tanto el periodo como los eventos
      let validateE = validate_events(register[1], reject, true)
      /*      console.log("validates")
           console.log(validateP)
           console.log(validateE) */

      //Si no son correctos los envia 
      if (validateP !== true || validateE !== true) return reject(new Response(415, "Uno o más datos son incorrectos", [validateP, validateE]));

      //cosulta de ingresar periodos
      Periods_Model.register_periods(register[0]).then((res) => {   //Ingresar el periodo

        //vincular el id del perido que se acaba de registrar 
        register[1].idPeriodo = res.result.insertId

        //cosulta de ingresar eventos
        Events_Model.register_events(register[1]).then((res2) => {  //Ingresar 

          resolve({ message: [res, res2] })

        }).catch((error) => { reject(error) })

      }).catch((error) => { reject(error) })
    })
  }
  update_periods(id, update) {
    return new Promise((resolve, reject) => {
      Periods_Model.update_periods(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
  delete_periods(id) {
    return new Promise((resolve, reject) => {
      Periods_Model.delete_periods(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

}

module.exports = new Periods_Controller();