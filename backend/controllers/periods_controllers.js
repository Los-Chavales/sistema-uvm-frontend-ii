const Periods_Model = require('../models/periods_models')
const Events_Model = require('../models/events_models');
const { validate_periods, validate_events } = require('../models/validations')
const Response = require('../models/response')

class Periods_Controller{
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
      if (validateP !== true || validateE !== true) return reject(new Response(415, "Uno o más datos son incorrectos", [validateP,validateE]));

        //cosulta de ingresar periodos
        Periods_Model.register_periods(register[0]).then((res)=>{   //Ingresar el periodo

          //vincular el id del perido que se acaba de registrar 
          register[1].idPeriodo = res.result.insertId

          //cosulta de ingresar eventos
          Events_Model.register_events(register[1]).then((res2) => {  //Ingresar 

            resolve({message: [res, res2]})

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