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
  search_for_repeats(idTeacher, idSubject, idSection){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `asignados` WHERE `idProfesor` = ? && `idMateria` = ? && `idSeccion` = ?', [idTeacher, idSubject, idSection], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                resolve(new Response(404, 'No hay repetidos', results));
              } else {
                reject(new Response(200, 'Hay repetidos', results));
              }
          };
      });
    })
  }
  search_no_schedules(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_asignado`, `nombre`, `apellido` , `nombre_materia`, `nombre_seccion` FROM `asignados` JOIN `usuarios` JOIN `materias` JOIN `secciones` WHERE idProfesor = id_usuario && idMateria = id_materia && idSeccion = id_seccion && `idHorario` IS null', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'Todos tienen horario', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  register_assigned(register){
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `asignados` SET ?', register, function (error, results, fields) {
          if (error) {
              if (error.errno == 1048) reject(new Response(400, "No ingresó ningún dato en: " + error.sqlMessage.substring(7).replace(' cannot be null', '')));
              reject(new Response(500, err, err));
          }
          if (results) {
              resolve(new Response(200, "Registro exitoso", results));
          }
      })
    })
  }
  update_assigned_schedules(idAssigned, idSchedule){
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `asignados` SET `idHorario`= ? WHERE `id_asignado` = ?', [idSchedule, idAssigned], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó ningún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + idAssigned + '" no existe');
            reject(new Response(404, 'No existe algún dato con el ID indicado: ' + idAssigned, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha asignado exitosamente", rows));
          }
        }
      })
    })
  }
}

module.exports = new Assigned_Model();