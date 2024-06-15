const Activities_Model = require('../models/activities_models')

class Activities_Controller{
  see_activities() {
    return new Promise((resolve, reject) => {
      Activities_Model.see_activities().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_activities_planning(id_subject, id_section) {
    return new Promise((resolve, reject) => {
      Activities_Model.see_activities_planning(id_subject, id_section).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  register_activities(register) {
    return new Promise((resolve, reject) => {
      Activities_Model.register_activities(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }  

  update_activities(id, update) {
    return new Promise((resolve, reject) => {
      Activities_Model.update_activities(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

  delete_activities(id) {
    return new Promise((resolve, reject) => {
      Activities_Model.delete_activities(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
}

module.exports = new Activities_Controller();