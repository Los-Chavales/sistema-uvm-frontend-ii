const Subjects_Model = require('../models/subjects_models')

class Subjects_Controller{
  see_subjects() {
    return new Promise((resolve, reject) => {
        Subjects_Model.see_subjects().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_subject(name) {
    return new Promise((resolve, reject) => {
        Subjects_Model.search_subject(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  register_subject(register) {
    return new Promise((resolve, reject) => {
      Subjects_Model.register_subject(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }  

  update_subject(id, update) {
    return new Promise((resolve, reject) => {
      Subjects_Model.update_subject(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

  delete_subject(id) {
    return new Promise((resolve, reject) => {
      Subjects_Model.delete_subject(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

  delete_subject_teacher(id_subject, id_teacher) {
    return new Promise((resolve, reject) => {
      Subjects_Model.delete_subject_teacher(id_subject, id_teacher).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

  delete_teacher_subject(id_teacher, id_subject) {
    return new Promise((resolve, reject) => {
      Subjects_Model.delete_teacher_subject(id_teacher, id_subject).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
}

module.exports = new Subjects_Controller();