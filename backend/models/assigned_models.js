const connection = require('../config/conexionMySql');
const Response = require('./response')

class Assigned_Model{
  see_options_assigned(id){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_asignado`, `nombre`, `apellido` , `nombre_materia`, `nombre_seccion` FROM `asignados` JOIN `usuarios` JOIN `materias` JOIN `secciones` WHERE idProfesor = id_usuario && idMateria = id_materia && idSeccion = id_seccion && `idProfesor` = ?', id, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen algo para este profe', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  see_specific_assigned(idTeacher, idAssigned){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_asignado`, `nombre`, `apellido` , `nombre_materia`, `nombre_seccion` FROM `asignados` JOIN `usuarios` JOIN `materias` JOIN `secciones` WHERE idProfesor = id_usuario && idMateria = id_materia && idSeccion = id_seccion && `idProfesor` = ? && `id_asignado` = ?', [idTeacher, idAssigned], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen algo así para este profe', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
}

module.exports = new Assigned_Model();