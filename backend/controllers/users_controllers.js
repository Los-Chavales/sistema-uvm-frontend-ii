const Users_Model = require('../models/users_models');

class Users_Controller{
  see_users() {
    return new Promise((resolve, reject) => {
        Users_Model.see_users().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_teachers_subjects() {
    return new Promise((resolve, reject) => {
        Users_Model.see_teachers_subjects().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_teachers_subjects_sections() {
    return new Promise((resolve, reject) => {
        Users_Model.see_teachers_subjects_sections().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  register_user_director(register) {
    return new Promise((resolve, reject) => {
      Users_Model.register_user_director(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }  

  register_user_teacher(register) {
    return new Promise((resolve, reject) => {
      Users_Model.register_user_teacher(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }  

  login(user) {
    return new Promise((resolve, reject) => {
      Users_Model.login(user).then((token) => {
        resolve(token)
      }).catch((error) => { reject(error) });
    })
  }

  update_user(id, update) {
    return new Promise((resolve, reject) => {
      Users_Model.update_user(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 

  delete_user(id) {
    return new Promise((resolve, reject) => {
      Users_Model.delete_user(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
}

module.exports = new Users_Controller();