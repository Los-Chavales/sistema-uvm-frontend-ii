const Assigned_Model = require('../models/assigned_models');

class Assigned_Controller {
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
}

module.exports = new Assigned_Controller();