const connection = require('../config/conexionMySql');
const Response = require('./response')

class Sections_Model{
  see_sections(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `secciones`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen secciones registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  search_sections(name){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `secciones` WHERE `nombre_seccion` = ?', name, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen secciones con ese nombre registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  see_activities_sections(id_section, id_subject){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `nombre_seccion`, `trimestre`, `nombre`, `apellido` , `nombre_materia` ,`nombre_actividad`,`numero_semana`, `nombre_periodo` FROM `asignados` JOIN `materias` JOIN `secciones` JOIN `actividades` JOIN `periodos` JOIN `semanas` JOIN `usuarios` WHERE idSeccion = ? && id_seccion = ? && idMateria = ? && id_materia = ? && id_asignado = idAsignados && idNumeroSemana = id_semana && idProfesor = id_usuario && idPeriodo = id_periodo', [id_section, id_section, id_subject, id_subject], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen actividades registradas para esta sección', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  see_activities_schedules(id_section, id_subject){ //Horarios
    return new Promise((resolve, reject) => {
      connection.query('SELECT `nombre_seccion`, `trimestre` ,`nombre`, `apellido`,`nombre_materia`, `dia_semana`, `hora_inicio`, `hora_final` FROM `asignados` JOIN `secciones` JOIN `materias` JOIN `horarios` JOIN `usuarios` WHERE idSeccion = ? && id_seccion = ? && idMateria = ? && id_materia = ? && idHorario = id_horario && idProfesor = id_usuario', [id_section, id_section, id_subject, id_subject], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen horarios registrados para esta sección', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  register_section(register){
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `secciones` SET ?', register, function (error, results, fields) {
          if (error) {
              if (error.errno == 1048) reject(new Response(400, "No ingresó nungún dato en: " + error.sqlMessage.substring(7).replace(' cannot be null', '')));
              reject(error);
              console.error("Error SQL: ", error.sqlMessage);
          }
          if (results) {
              resolve(new Response(200, "Registro exitoso", results));
          }
      })
    })
  }

  update_section(id, update){
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `secciones` SET ? WHERE `id_seccion` = ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó nungún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ninguna sección con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó la sección "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }

  delete_section(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `secciones` WHERE `id_seccion` = ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó la sección "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }


}

module.exports = new Sections_Model();