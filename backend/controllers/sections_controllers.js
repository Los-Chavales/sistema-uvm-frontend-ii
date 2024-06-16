const Sections_Model = require('../models/sections_models');

class Sections_Controller{
  see_sections() {
    return new Promise((resolve, reject) => {
      Sections_Model.see_sections().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_sections(name) {
    return new Promise((resolve, reject) => {
      Sections_Model.search_sections(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_activities_sections(id_section, id_subject) {
    return new Promise((resolve, reject) => {
      Sections_Model.see_activities_sections(id_section, id_subject).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_activities_schedules(id_section, id_subject) { //Horarios
    return new Promise((resolve, reject) => {
      Sections_Model.see_activities_schedules(id_section, id_subject).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  
  register_section(register) {
    return new Promise((resolve, reject) => {
      Sections_Model.register_section(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }  

  update_section(id, update) {
    return new Promise((resolve, reject) => {
      Sections_Model.update_section(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

  delete_section(id) {
    return new Promise((resolve, reject) => {
      Sections_Model.delete_section(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

}

module.exports = new Sections_Controller();