const Users_Model = require('../models/users_models');

class Users_Controller {
  see_users() {
    return new Promise((resolve, reject) => {
      Users_Model.see_users().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_users_teachers() {
    return new Promise((resolve, reject) => {
      Users_Model.see_users_teachers().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_users(name) {
    return new Promise((resolve, reject) => {
      Users_Model.search_users(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_users_teachers(name) {
    return new Promise((resolve, reject) => {
      Users_Model.search_users_teachers(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_teachers_subjects() {
    return new Promise((resolve, reject) => {

      Users_Model.see_teachers_subjects().then((res) => {
        const transformedData = [];
        let users = res.message
        users.forEach(userData => {
          let existingUser = transformedData.find(user => user.nombre === userData.nombre && user.apellido === userData.apellido);

          if (!existingUser) {
            existingUser = {
              nombre: userData.nombre,
              apellido: userData.apellido,
              materias: []
            };
            transformedData.push(existingUser);
          }

          existingUser.materias.push({
            nombre_materia: userData.nombre_materia,
            descripcion: userData.descripcion
          });
        });
        resolve(transformedData);
      }).catch((error) => { reject(error); })
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

  update_user_teacher(id, update) {
    return new Promise((resolve, reject) => {
      Users_Model.update_user_teacher(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

  delete_user(id) {
    return new Promise((resolve, reject) => {
      Users_Model.delete_user(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

  delete_user_teacher(id) {
    return new Promise((resolve, reject) => {
      Users_Model.delete_user_teacher(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
}

module.exports = new Users_Controller();