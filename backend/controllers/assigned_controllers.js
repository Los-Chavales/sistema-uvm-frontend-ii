const Assigned_Model = require('../models/assigned_models');

class Assigned_Controller {
  see_assigned() {
    return new Promise((resolve, reject) => {
      Assigned_Model.see_assigned().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  see_options_assigned(id) {
    return new Promise((resolve, reject) => {
      Assigned_Model.see_options_assigned(id).then((res) => {
        let resultAssigned = {
          nombre: res.result[0].nombre,
          apellido: res.result[0].apellido,
          asignados: []
        }

        for (let i = 0; i < res.result.length; i++) {
          resultAssigned.asignados.push({
            id_asignado: res.result[i].id_asignado,
            nombre_materia: res.result[i].nombre_materia,
            nombre_seccion: res.result[i].nombre_seccion
          })
        }

        res.result = [resultAssigned]
        resolve(res) 

      }).catch((error) => { reject(error); })
    })
  }
  see_specific_assigned(idTeacher, idAssigned) {
    return new Promise((resolve, reject) => {
      Assigned_Model.see_specific_assigned(idTeacher, idAssigned).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  search_no_schedules() {
    return new Promise((resolve, reject) => {
      Assigned_Model.search_no_schedules().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }
  register_assigned(register) {
    return new Promise((resolve, reject) => {
     for (let i = 0; i < register.idMaterias.length; i++) {
      Assigned_Model.search_for_repeats(register.idProfesor, register.idMaterias[i], register.idSeccion)
      .then((res) => { 

        Assigned_Model.register_assigned({idProfesor: register.idProfesor, idMateria: register.idMaterias[i], idSeccion: register.idSeccion})
        .then((res) => 
          { resolve(res) }
        )
        .catch((error) => { reject(error); })

      }).catch((error) => { reject(error); })
     }
    })
  }
  update_assigned_schedules(idAssigned, idSchedule) {
    return new Promise((resolve, reject) => {
      Assigned_Model.update_assigned_schedules(idAssigned, idSchedule).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  } 
  
  delete_schedules(id) {
    return new Promise((resolve, reject) => {
      Assigned_Model.delete_schedules(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
}

module.exports = new Assigned_Controller();