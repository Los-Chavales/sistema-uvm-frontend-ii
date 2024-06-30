const Weeks_Model = require('../models/weeks_models')

class Weeks_Controller{
  see_weeks() {
    return new Promise((resolve, reject) => {
      Weeks_Model.see_weeks().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  search_weeks(number) {
    return new Promise((resolve, reject) => {
      Weeks_Model.search_weeks(number).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  register_week(register) {
    return new Promise((resolve, reject) => {
      Weeks_Model.register_week(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
  update_week(id, update) {
    return new Promise((resolve, reject) => {
      Weeks_Model.update_week(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
  delete_week(id) {
    return new Promise((resolve, reject) => {
      Weeks_Model.delete_week(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
}

module.exports = new Weeks_Controller();