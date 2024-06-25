const Periods_Model = require('../models/periods_models')
const Events_Model = require('../models/events_models');

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
  register_periods(register) {
    return new Promise((resolve, reject) => {
      Periods_Model.register_periods(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
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