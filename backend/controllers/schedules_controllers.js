const Schedules_Model = require('../models/schedules_models')

class Schedules_Controller{
  see_schedules() {
    return new Promise((resolve, reject) => {
      Schedules_Model.see_schedules().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  search_schedules(number) {
    return new Promise((resolve, reject) => {
      Schedules_Model.search_schedules(number).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  register_schedules(register) {
    return new Promise((resolve, reject) => {
      Schedules_Model.register_schedules(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
  update_schedules(id, update) {
    return new Promise((resolve, reject) => {
      Schedules_Model.update_schedules(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
  delete_schedules(id) {
    return new Promise((resolve, reject) => {
      Schedules_Model.delete_schedules(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
}

module.exports = new Schedules_Controller();